// =====================================================
// MyFitRout - Script Automático de Deploy
// Atualiza 14 vídeos e faz deploy no Vercel
// VERSÃO CORRIGIDA com IDs corretos!
// =====================================================

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Cores para terminal
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function printHeader() {
  console.log(`\n${colors.cyan}${'='.repeat(60)}`);
  console.log('  MyFitRout - Atualização Automática de Vídeos');
  console.log('  14 exercícios serão atualizados');
  console.log(`${'='.repeat(60)}${colors.reset}\n`);
}

function createBackup(filepath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupPath = `${filepath}.backup-${timestamp}`;
  fs.copyFileSync(filepath, backupPath);
  console.log(`${colors.green}✅ Backup criado: ${backupPath}${colors.reset}\n`);
  return backupPath;
}

function updateExercises(filepath) {
  console.log(`${colors.yellow}🔄 Atualizando exercícios...${colors.reset}\n`);
  
  let content = fs.readFileSync(filepath, 'utf8');
  let updates = 0;

  // Definir todas as atualizações COM OS IDS CORRETOS!
  const replacements = [
    // LEGS (IDs corretos com —)
    { id: 'Zancada búlgara — Mancuernas', video: 'LT_nelifZ_k', name: 'Afundo búlgaro (Halteres)' },
    { id: 'Zancada — Walking', video: 'gINMjZAUSRE', name: 'Afundo (Walking)' },
    { id: 'Zancada inversa — Peso corporal', video: 'SW_R1y9K_Ns', name: 'Afundo reverso' },
    { id: 'Curl femoral tumbado — Bilateral', video: 'K28eNyvdxQM', name: 'Mesa flexora (Bilateral)' },
    { 
      id: 'Hip thrust (empuje de cadera) — Máquina', 
      video: 'SY1eYXrCPzg', 
      name: 'Elevação pélvica com barra no banco',
      rename: true,
      newNamePt: 'Elevação pélvica com barra no banco',
      newNameEn: 'Hip Thrust (Barbell on bench)'
    },
    { id: 'Hip thrust (empuje de cadera) — Mancuerna', video: 'eLsXLoV3jLM', name: 'Hip thrust (Halter)' },
    { id: 'Puente de glúteos — En el suelo (bilateral)', video: '1nEL_H0lnNc', name: 'Ponte de glúteo (bilateral)' },
    
    // BACK
    { 
      id: 'back_back_deadlift_conventional_barbell_gym_advanced', 
      video: 'lp3Nkr05TC8', 
      name: 'Levantamento terra romeno com barra',
      rename: true,
      newNamePt: 'Levantamento terra romeno com barra',
      newNameEn: 'Romanian Deadlift (Barbell)'
    },
    { 
      id: 'back_upper_back_pendlay_row_from_floor_barbell_gym_advanced', 
      video: 'TD00shuX6hA', 
      name: 'Remada curvada - pegada supinada',
      rename: true,
      newNamePt: 'Remada curvada - pegada supinada',
      newNameEn: 'Bent Over Row (Underhand grip)'
    },
    
    // SHOULDERS
    { id: 'shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate', video: '0-UNSkfq-Vw', name: 'Desenvolvimento Militar' },
    { id: 'shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner', video: 'Fhrvcqy4hKA', name: 'Desenvolvimento (Halteres Sentado)' },
    { id: 'shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate', video: 'xNM9hqpQl34', name: 'Elevação Lateral (Cabo)' },
    { id: 'shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate', video: '166waxYDZhg', name: 'Desenvolvimento Arnold' },
    
    // CORE
    { id: 'core_abs_crunch_basic_bodyweight_home_beginner', video: '4eE2mHdh2wM', name: 'Abdominal Curto / Crunch' }
  ];

  // Aplicar cada atualização
  for (const item of replacements) {
    const escapedId = item.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`id:\\s*"${escapedId}"([\\s\\S]*?)videoUrl:\\s*"[^"]*"`, 'g');
    
    const match = content.match(pattern);
    
    if (match) {
      const oldBlock = match[0];
      let newBlock = oldBlock.replace(
        /(videoUrl:\s*")[^"]*"/,
        `$1${item.video}"`
      );
      
      // Se precisa renomear
      if (item.rename) {
        newBlock = newBlock.replace(
          /(\[Language\.PT\]:\s*")[^"]*"/,
          `$1${item.newNamePt}"`
        );
        newBlock = newBlock.replace(
          /(\[Language\.EN\]:\s*")[^"]*"/,
          `$1${item.newNameEn}"`
        );
      }
      
      content = content.replace(oldBlock, newBlock);
      updates++;
      
      const renameText = item.rename ? ' (renomeado)' : '';
      console.log(`  ${colors.green}✓ ${item.name}${renameText}${colors.reset}`);
    } else {
      console.log(`  ${colors.red}✗ Não encontrado: ${item.name}${colors.reset}`);
    }
  }

  // Salvar arquivo atualizado
  fs.writeFileSync(filepath, content, 'utf8');
  
  console.log(`\n${colors.green}✅ ${updates} exercícios atualizados!${colors.reset}\n`);
  return updates;
}

function gitCommitPush() {
  console.log(`${colors.yellow}📦 Fazendo commit e push...${colors.reset}\n`);
  
  try {
    // Git add
    execSync('git add data/exercises.ts', { stdio: 'inherit' });
    console.log(`${colors.green}  ✓ git add${colors.reset}`);
    
    // Git commit
    execSync('git commit -m "feat: adicionar 14 novos vídeos de exercícios (Legs, Back, Shoulders, Core)"', { stdio: 'inherit' });
    console.log(`${colors.green}  ✓ git commit${colors.reset}`);
    
    // Git push
    execSync('git push', { stdio: 'inherit' });
    console.log(`${colors.green}  ✓ git push${colors.reset}`);
    
    console.log(`\n${colors.green}✅ Deploy enviado com sucesso!${colors.reset}`);
    console.log(`${colors.cyan}🚀 Vercel vai fazer o deploy automático em ~2 minutos${colors.reset}\n`);
    return true;
    
  } catch (error) {
    console.log(`\n${colors.red}❌ Erro no git: ${error.message}${colors.reset}`);
    return false;
  }
}

function main() {
  printHeader();
  
  const exercisesFile = path.join(process.cwd(), 'data', 'exercises.ts');
  
  // Verificar arquivo
  if (!fs.existsSync(exercisesFile)) {
    console.log(`${colors.red}❌ ERRO: Arquivo não encontrado!${colors.reset}`);
    console.log(`   Esperado: ${exercisesFile}`);
    process.exit(1);
  }
  
  console.log(`${colors.green}✅ Arquivo encontrado: ${exercisesFile}${colors.reset}`);
  
  // Criar backup
  const backupPath = createBackup(exercisesFile);
  
  // Confirmar
  console.log(`${colors.yellow}⚠️  ATENÇÃO: Este script vai:${colors.reset}`);
  console.log('  1. Atualizar 14 exercícios no arquivo exercises.ts');
  console.log('  2. Fazer commit e push para o GitHub');
  console.log('  3. Vercel vai fazer deploy automático\n');
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question(`${colors.cyan}Deseja continuar? (sim/não): ${colors.reset}`, (answer) => {
    readline.close();
    
    if (answer.toLowerCase() !== 'sim') {
      console.log(`\n${colors.yellow}❌ Operação cancelada pelo usuário${colors.reset}`);
      // Restaurar backup
      fs.unlinkSync(exercisesFile);
      fs.renameSync(backupPath, exercisesFile);
      console.log(`${colors.green}✅ Arquivo restaurado do backup${colors.reset}\n`);
      process.exit(0);
    }
    
    console.log();
    
    // Atualizar exercícios
    const count = updateExercises(exercisesFile);
    
    if (count === 0) {
      console.log(`${colors.red}❌ Nenhum exercício foi atualizado!${colors.reset}`);
      process.exit(1);
    }
    
    // Git commit e push
    const success = gitCommitPush();
    
    if (success) {
      console.log(`${colors.cyan}${'='.repeat(60)}`);
      console.log('  ✅ DEPLOY CONCLUÍDO COM SUCESSO!');
      console.log(`${'='.repeat(60)}${colors.reset}\n`);
      console.log(`${colors.green}📊 RESULTADO:${colors.reset}`);
      console.log(`  • ${count} vídeos atualizados`);
      console.log(`  • Total COM vídeo: ${64 + count} exercícios (${((64 + count) / 158 * 100).toFixed(1)}%)`);
      console.log(`  • Total SEM vídeo: ${94 - count} exercícios (${((94 - count) / 158 * 100).toFixed(1)}%)`);
      console.log(`\n${colors.yellow}🔍 Verificar deploy em: https://vercel.com${colors.reset}\n`);
    } else {
      console.log(`\n${colors.red}⚠️  Houve algum problema com o git${colors.reset}`);
      console.log(`${colors.yellow}Mas o arquivo foi atualizado!${colors.reset}`);
      console.log(`${colors.yellow}Você pode fazer commit/push manualmente${colors.reset}\n`);
    }
  });
}

main();
