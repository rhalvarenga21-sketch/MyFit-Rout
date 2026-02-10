// MyFitRout - Video Audit Report Generator
// Agent 3.1 - Video Audit Lead
// Squad 3: Content & Media

import { EXERCISE_LIBRARY } from '../data/exercises';

export interface VideoAuditResult {
    totalExercises: number;
    withVideo: number;
    withoutVideo: number;
    duplicateUrls: string[];
    brokenUrls: string[];
    byMuscleGroup: { [key: string]: { total: number; withVideo: number } };
    byDifficulty: { [key: string]: { total: number; withVideo: number } };
    missingVideoExercises: Array<{
        id: string;
        name: string;
        muscleGroup: string;
        difficulty: string;
    }>;
}

/**
 * Executar auditoria completa dos vídeos
 */
export const auditExerciseVideos = (): VideoAuditResult => {
    const result: VideoAuditResult = {
        totalExercises: EXERCISE_LIBRARY.length,
        withVideo: 0,
        withoutVideo: 0,
        duplicateUrls: [],
        brokenUrls: [],
        byMuscleGroup: {},
        byDifficulty: {},
        missingVideoExercises: []
    };

    const urlMap = new Map<string, string[]>(); // URL -> [exercise IDs]

    // Processar cada exercício
    EXERCISE_LIBRARY.forEach(exercise => {
        const hasVideo = !!exercise.videoUrl;

        if (hasVideo) {
            result.withVideo++;

            // Rastrear URLs duplicadas
            const url = exercise.videoUrl!;
            if (urlMap.has(url)) {
                urlMap.get(url)!.push(exercise.id);
            } else {
                urlMap.set(url, [exercise.id]);
            }
        } else {
            result.withoutVideo++;
            result.missingVideoExercises.push({
                id: exercise.id,
                name: exercise.name.PT,
                muscleGroup: exercise.muscleGroup,
                difficulty: exercise.difficulty
            });
        }

        // Estatísticas por grupo muscular
        if (!result.byMuscleGroup[exercise.muscleGroup]) {
            result.byMuscleGroup[exercise.muscleGroup] = { total: 0, withVideo: 0 };
        }
        result.byMuscleGroup[exercise.muscleGroup].total++;
        if (hasVideo) {
            result.byMuscleGroup[exercise.muscleGroup].withVideo++;
        }

        // Estatísticas por dificuldade
        if (!result.byDifficulty[exercise.difficulty]) {
            result.byDifficulty[exercise.difficulty] = { total: 0, withVideo: 0 };
        }
        result.byDifficulty[exercise.difficulty].total++;
        if (hasVideo) {
            result.byDifficulty[exercise.difficulty].withVideo++;
        }
    });

    // Identificar duplicatas
    urlMap.forEach((exerciseIds, url) => {
        if (exerciseIds.length > 1) {
            result.duplicateUrls.push(`${url} (usado em: ${exerciseIds.join(', ')})`);
        }
    });

    return result;
};

/**
 * Gerar relatório em Markdown
 */
export const generateAuditReport = (): string => {
    const audit = auditExerciseVideos();
    const date = new Date().toISOString().split('T')[0];

    let report = `# MyFitRout - Relatório de Auditoria de Vídeos\n\n`;
    report += `**Data**: ${date}\n`;
    report += `**Gerado por**: Agent 3.1 - Video Audit Lead\n\n`;
    report += `---\n\n`;

    // Resumo Geral
    report += `## 📊 Resumo Geral\n\n`;
    report += `- **Total de Exercícios**: ${audit.totalExercises}\n`;
    report += `- **Com Vídeo**: ${audit.withVideo} (${((audit.withVideo / audit.totalExercises) * 100).toFixed(1)}%)\n`;
    report += `- **Sem Vídeo**: ${audit.withoutVideo} (${((audit.withoutVideo / audit.totalExercises) * 100).toFixed(1)}%)\n`;
    report += `- **URLs Duplicadas**: ${audit.duplicateUrls.length}\n\n`;

    // Por Grupo Muscular
    report += `## 💪 Por Grupo Muscular\n\n`;
    report += `| Grupo | Total | Com Vídeo | % |\n`;
    report += `|-------|-------|-----------|---|\n`;
    Object.entries(audit.byMuscleGroup)
        .sort((a, b) => b[1].total - a[1].total)
        .forEach(([group, stats]) => {
            const percentage = ((stats.withVideo / stats.total) * 100).toFixed(0);
            report += `| ${group} | ${stats.total} | ${stats.withVideo} | ${percentage}% |\n`;
        });
    report += `\n`;

    // Por Dificuldade
    report += `## 🎯 Por Dificuldade\n\n`;
    report += `| Dificuldade | Total | Com Vídeo | % |\n`;
    report += `|-------------|-------|-----------|---|\n`;
    Object.entries(audit.byDifficulty).forEach(([difficulty, stats]) => {
        const percentage = ((stats.withVideo / stats.total) * 100).toFixed(0);
        report += `| ${difficulty} | ${stats.total} | ${stats.withVideo} | ${percentage}% |\n`;
    });
    report += `\n`;

    // URLs Duplicadas
    if (audit.duplicateUrls.length > 0) {
        report += `## ⚠️ URLs Duplicadas\n\n`;
        report += `As seguintes URLs estão sendo usadas por múltiplos exercícios:\n\n`;
        audit.duplicateUrls.forEach(dup => {
            report += `- ${dup}\n`;
        });
        report += `\n`;
    }

    // Exercícios Sem Vídeo (Top 50)
    report += `## 🎥 Exercícios Sem Vídeo (Top 50 Prioritários)\n\n`;
    report += `| ID | Nome | Grupo | Dificuldade |\n`;
    report += `|----|------|-------|-------------|\n`;
    audit.missingVideoExercises.slice(0, 50).forEach(ex => {
        report += `| ${ex.id} | ${ex.name} | ${ex.muscleGroup} | ${ex.difficulty} |\n`;
    });
    report += `\n`;

    // Próximos Passos
    report += `## 🎬 Próximos Passos\n\n`;
    report += `1. **Prioridade ALTA**: Adicionar vídeos para os ${Math.min(50, audit.withoutVideo)} exercícios listados acima\n`;
    report += `2. **Prioridade MÉDIA**: Resolver ${audit.duplicateUrls.length} URLs duplicadas\n`;
    report += `3. **Prioridade BAIXA**: Validar qualidade dos vídeos existentes\n\n`;

    // Meta
    report += `## 🎯 Meta\n\n`;
    const target = 90;
    const current = ((audit.withVideo / audit.totalExercises) * 100).toFixed(1);
    const remaining = Math.ceil((target / 100 * audit.totalExercises) - audit.withVideo);
    report += `- **Meta**: ${target}% de cobertura\n`;
    report += `- **Atual**: ${current}%\n`;
    report += `- **Faltam**: ${remaining} vídeos para atingir a meta\n\n`;

    report += `---\n\n`;
    report += `*Relatório gerado automaticamente pelo Squad 3 - Content & Media*\n`;

    return report;
};

/**
 * Exportar lista de exercícios sem vídeo (CSV)
 */
export const exportMissingVideosCSV = (): string => {
    const audit = auditExerciseVideos();

    let csv = 'ID,Nome (PT),Nome (EN),Nome (ES),Grupo Muscular,Dificuldade,Equipamentos\n';

    audit.missingVideoExercises.forEach(ex => {
        const exercise = EXERCISE_LIBRARY.find(e => e.id === ex.id);
        if (exercise) {
            csv += `"${exercise.id}","${exercise.name.PT}","${exercise.name.EN}","${exercise.name.ES}","${exercise.muscleGroup}","${exercise.difficulty}","${exercise.equipment}"\n`;
        }
    });

    return csv;
};

/**
 * Salvar relatório como arquivo
 */
export const downloadAuditReport = (): void => {
    const report = generateAuditReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `video-audit-report-${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Salvar CSV de exercícios sem vídeo
 */
export const downloadMissingVideosCSV = (): void => {
    const csv = exportMissingVideosCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `missing-videos-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Obter estatísticas rápidas
 */
export const getQuickStats = (): {
    coverage: number;
    total: number;
    withVideo: number;
    withoutVideo: number;
} => {
    const audit = auditExerciseVideos();
    return {
        coverage: (audit.withVideo / audit.totalExercises) * 100,
        total: audit.totalExercises,
        withVideo: audit.withVideo,
        withoutVideo: audit.withoutVideo
    };
};
