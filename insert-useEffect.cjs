const fs = require('fs');

const filepath = 'App.tsx';

console.log('📂 Lendo App.tsx...\n');
let content = fs.readFileSync(filepath, 'utf8');

const useEffectBlock = `
  // Detectar reset password na URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token') && hash.includes('type=recovery')) {
      setResetPasswordMode(true);
    }
  }, []);
`;

const searchLine = "const [confirmPassword, setConfirmPassword] = useState('');";

if (!content.includes(searchLine)) {
  console.log('❌ ERRO: Linha não encontrada!');
  process.exit(1);
}

if (content.includes('type=recovery')) {
  console.log('⚠️  useEffect JÁ EXISTE!');
  process.exit(0);
}

const lines = content.split('\n');
const targetIndex = lines.findIndex(l => l.includes(searchLine));

lines.splice(targetIndex + 1, 0, useEffectBlock);

content = lines.join('\n');

fs.writeFileSync(filepath, content, 'utf8');

console.log('✅ useEffect ADICIONADO!');
console.log('🎯 Próximo: git add + commit + push\n');
