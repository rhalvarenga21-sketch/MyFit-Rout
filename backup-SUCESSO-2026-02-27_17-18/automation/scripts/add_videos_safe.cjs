// =====================================================
// MyFitRout - Script SEGURO para Adicionar 14 Vídeos
// Busca por IDs únicos (não nomes)
// =====================================================

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function printHeader() {
  console.log(`\n${colors.cyan}${'='.repeat(70)}`);
  console.log('  MyFitRout - Adição SEGURA de 14 Vídeos');
  console.log('  Procura por IDs únicos (independente do nome)');
  console.log(`${'='.repeat(70)}${colors.reset}\n`);
}

function adicionarVideos() {
  console.log(`${colors.yellow}🎬 Adicionando 14 vídeos por ID único...${colors.reset}\n`);
  
  const exercisesFile = path.join(process.cwd(), 'data', 'exercises.ts');
  
  if (!fs.existsSync(exercisesFile)) {
    console.log(`${colors.red}❌ Arquivo não encontrado: ${exercisesFile}${colors.reset}`);
    return 0;
  }
  
  let content = fs.readFileSync(exercisesFile, 'utf8');
  let updates = 0;

  // Mapear vídeos por padrões ÚNICOS de ID
  const videoMapping = [
    // LEGS - Procurar por IDs que contêm padrões específicos
    { pattern: /id:\s*"[^"]*búlgara[^"]*Mancuernas?[^"]*"/i, video: 'LT_nelifZ_k', name: 'Afundo búlgaro' },
    { pattern: /id:\s*"[^"]*Zancada[^"]*Walking[^"]*"/i, video: 'gINMjZAUSRE', name: 'Afundo Walking' },
    { pattern: /id:\s*"[^"]*inversa[^"]*Peso corporal[^"]*"/i, video: 'SW_R1y9K_Ns', name: 'Afundo reverso' },
    { pattern: /id:\s*"[^"]*Curl femoral[^"]*tumbado[^"]*Bilateral[^"]*"/i, video: 'K28eNyvdxQM', name: 'Mesa flexora' },
    { pattern: /id:\s*"[^"]*Hip thrust[^"]*Máquina[^"]*"/i, video: 'SY1eYXrCPzg', name: 'Hip thrust barra' },
    { pattern: /id:\s*"[^"]*Hip thrust[^"]*Mancuerna[^"]*"/i, video: 'eLsXLoV3jLM', name: 'Hip thrust halter' },
    { pattern: /id:\s*"[^"]*Puente[^"]*glúteos[^"]*suelo[^"]*bilateral[^"]*"/i, video: '1nEL_H0lnNc', name: 'Ponte glúteo' },
    
    // BACK - Procurar por IDs específicos conhecidos
    { pattern: /id:\s*"back_back_deadlift_conventional_barbell_gym_advanced"/i, video: 'lp3Nkr05TC8', name: 'Terra romeno' },
    { pattern: /id:\s*"back_upper_back_pendlay_row_from_floor_barbell_gym_advanced"/i, video: 'TD00shuX6hA', name: 'Remada curvada' },
    
    // SHOULDERS - IDs conhecidos
    { pattern: /id:\s*"shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate"/i, video: '0-UNSkfq-Vw', name: 'Desenvolvimento Militar' },
    { pattern: /id:\s*"shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner"/i, video: 'Fhrvcqy4hKA', name: 'Desenvolvimento sentado' },
    { pattern: /id:\s*"shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate"/i, video: 'xNM9hqpQl34', name: 'Elevação Lateral' },
    { pattern: /id:\s*"shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate"/i, video: '166waxYDZhg', name: 'Arnold press' },
    
    // CORE
    { pattern: /id:\s*"core_abs_crunch_basic_bodyweight_home_beginner"/i, video: '4eE2mHdh2wM', name: 'Abdominal crunch' }
  ];

  for (const item of videoMapping) {
    // Procurar o bloco do exercício
    const exerciseBlockPattern = new RegExp(
      `(${item.pattern.source}[\\s\\S]{0,500}?)videoUrl:\\s*"[^"]*"`,
      'i'
    );
    
    const match = content.match(exerciseBlockPattern);
    
    if (match) {
      // Substituir apenas se o videoUrl estiver vazio ou diferente
      const currentVideoUrl = match[0].match(/videoUrl:\s*"([^"]*)"/);
      
      if (currentVideoUrl && currentVideoUrl[1] !== item.video) {
        const newBlock = match[0].replace(
          /videoUrl:\s*"[^"]*"/,
          `videoUrl: "${item.video}"`
        );
        content = content.replace(match[0], newBlock);
        updates++;
        console.log(`  ${colors.green}✓ ${item.name}${colors.reset}`);
      } else if (currentVideoUrl && currentVideoUrl[1] === item.video) {
        console.log(`  ${colors.yellow}○ ${item.name} (já tem este vídeo)${colors.reset}`);
      }
    } else {
      console.log(`  ${colors.red}✗ ${item.name} (ID não encontrado)${colors.reset}`);
    }
  }

  if (updates > 0) {
    fs.writeFileSync(exercisesFile, content, 'utf8');
    console.log(`\n${colors.green}✅ ${updates} vídeos adicionados!${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}⚠️  Nenhum vídeo novo para adicionar${colors.reset}\n`);
  }
  
  return updates;
}

function contarVideos() {
  const exercisesFile = path.join(process.cwd(), 'data', 'exercises.ts');
  const content = fs.readFileSync(exercisesFile, 'utf8');
  const matches = content.match(/videoUrl:\s*"[a-zA-Z0-9_-]+"/g);
  return matches ? matches.length : 0;
}

function main() {
  printHeader();
  
  const videosAntes = contarVideos();
  console.log(`${colors.cyan}📊 Vídeos atuais: ${videosAntes}${colors.reset}\n`);
  
  console.log(`${colors.yellow}Este script vai:${colors.reset}`);
  console.log('  1. Procurar os 14 exercícios por padrões de ID');
  console.log('  2. Adicionar os vídeos do YouTube');
  console.log('  3. Trabalhar em BRANCH SEPARADA (seguro)');
  console.log('  4. NÃO vai para produção automaticamente\n');
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question(`${colors.cyan}Deseja continuar? (sim/não): ${colors.reset}`, (answer) => {
    readline.close();
    
    if (answer.toLowerCase() !== 'sim') {
      console.log(`\n${colors.yellow}❌ Operação cancelada${colors.reset}\n`);
      process.exit(0);
    }
    
    console.log();
    
    // Criar branch de teste
    console.log(`${colors.yellow}📦 Criando branch de teste...${colors.reset}`);
    try {
      execSync('git checkout -b adicionar-14-videos-safe', { stdio: 'inherit' });
      console.log(`${colors.green}✓ Branch criada${colors.reset}\n`);
    } catch (err) {
      // Já existe, fazer checkout
      try {
        execSync('git checkout adicionar-14-videos-safe', { stdio: 'inherit' });
        console.log(`${colors.green}✓ Branch existente carregada${colors.reset}\n`);
      } catch (err2) {
        console.log(`${colors.red}❌ Erro ao criar/mudar branch${colors.reset}\n`);
        process.exit(1);
      }
    }
    
    // Adicionar vídeos
    const updates = adicionarVideos();
    
    if (updates === 0) {
      console.log(`${colors.yellow}Nenhuma alteração para commitar.${colors.reset}\n`);
      process.exit(0);
    }
    
    const videosDepois = contarVideos();
    console.log(`${colors.cyan}📊 Vídeos após atualização: ${videosDepois}${colors.reset}`);
    console.log(`${colors.green}📈 Vídeos adicionados: +${videosDepois - videosAntes}${colors.reset}\n`);
    
    // Commit
    console.log(`${colors.yellow}📦 Fazendo commit...${colors.reset}`);
    try {
      execSync('git add data/exercises.ts', { stdio: 'inherit' });
      execSync('git commit -m "feat: adicionar 14 vídeos (safe method)"', { stdio: 'inherit' });
      console.log(`${colors.green}✓ Commit realizado${colors.reset}\n`);
    } catch (err) {
      console.log(`${colors.red}❌ Erro no commit${colors.reset}\n`);
      process.exit(1);
    }
    
    // Push
    console.log(`${colors.yellow}📤 Enviando para GitHub...${colors.reset}`);
    try {
      execSync('git push -u origin adicionar-14-videos-safe', { stdio: 'inherit' });
      console.log(`${colors.green}✓ Push realizado${colors.reset}\n`);
    } catch (err) {
      console.log(`${colors.red}❌ Erro no push${colors.reset}\n`);
      process.exit(1);
    }
    
    // Sucesso!
    console.log(`${colors.cyan}${'='.repeat(70)}`);
    console.log('  ✅ VÍDEOS ADICIONADOS COM SUCESSO!');
    console.log(`${'='.repeat(70)}${colors.reset}\n`);
    
    console.log(`${colors.green}📊 RESULTADO:${colors.reset}`);
    console.log(`  • Vídeos antes: ${videosAntes}`);
    console.log(`  • Vídeos depois: ${videosDepois}`);
    console.log(`  • Novos: +${videosDepois - videosAntes}\n`);
    
    console.log(`${colors.yellow}🔍 PRÓXIMOS PASSOS:${colors.reset}`);
    console.log('  1. Vercel vai criar um PREVIEW do deploy');
    console.log('  2. Teste o preview para confirmar que funciona');
    console.log('  3. Se funcionar, faça merge para main:\n');
    console.log(`${colors.cyan}     git checkout main${colors.reset}`);
    console.log(`${colors.cyan}     git merge adicionar-14-videos-safe${colors.reset}`);
    console.log(`${colors.cyan}     git push${colors.reset}\n`);
    
    console.log(`${colors.green}🛡️  PRODUÇÃO CONTINUA FUNCIONANDO NORMALMENTE!${colors.reset}\n`);
  });
}

main();
