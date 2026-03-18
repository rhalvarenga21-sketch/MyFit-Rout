const fs = require('fs');

// Ler arquivo atual
let content = fs.readFileSync('App.tsx', 'utf8');

// 1. Adicionar imports necessários (após os imports existentes, antes de "const DAYS")
const importLine = `import { supabase } from './lib/supabase';`;
if (!content.includes('import { supabase }')) {
  content = content.replace(
    "const DAYS = ['mon'",
    `${importLine}\n\nconst DAYS = ['mon'`
  );
}

// 2. Adicionar states (após "const [currentUser, setCurrentUser]...")
const newStates = `  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
`;

if (!content.includes('resetPasswordMode')) {
  content = content.replace(
    'const [profile, setProfile] = useState<UserProfile | null>(null);',
    `const [profile, setProfile] = useState<UserProfile | null>(null);
${newStates}`
  );
}

// 3. Adicionar useEffect para detectar hash (após os outros useEffects)
const resetDetectEffect = `
  // Detectar reset password na URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token') && hash.includes('type=recovery')) {
      setResetPasswordMode(true);
    }
  }, []);
`;

if (!content.includes('Detectar reset password')) {
  // Adicionar após o último useEffect de currency
  content = content.replace(
    /useEffect\(\(\) => \{[\s\S]*?setCurrency.*?\n  \}, \[\]\);/,
    (match) => match + resetDetectEffect
  );
}

// 4. Adicionar função handleResetPassword (antes do "if (!currentUser)")
const resetFunction = `
  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      alert('Senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Senhas não conferem');
      return;
    }
    
    setIsSyncing(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      alert('Senha alterada com sucesso!');
      setResetPasswordMode(false);
      setNewPassword('');
      setConfirmPassword('');
      window.location.hash = '';
    } catch (error: any) {
      alert('Erro ao alterar senha: ' + error.message);
    } finally {
      setIsSyncing(false);
    }
  };
`;

if (!content.includes('handleResetPassword')) {
  content = content.replace(
    'if (!currentUser) {',
    `${resetFunction}\n  if (!currentUser) {`
  );
}

// 5. Adicionar modal (antes do closing tag final </div> do App)
const resetModal = `
      {resetPasswordMode && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full space-y-6 border-2 border-slate-800">
            <div className="text-center space-y-2">
              <Key size={40} className="text-indigo-400 mx-auto" />
              <h2 className="text-2xl font-black">Nova Senha</h2>
              <p className="text-sm text-slate-400">Escolha uma senha forte</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 ml-2">Nova Senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-xl outline-none focus:border-indigo-500 mt-1"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 ml-2">Confirmar Senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-xl outline-none focus:border-indigo-500 mt-1"
                  placeholder="Digite novamente"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setResetPasswordMode(false);
                  window.location.hash = '';
                }}
                className="flex-1 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleResetPassword}
                disabled={isSyncing}
                className="flex-1 p-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold disabled:opacity-50 transition-colors"
              >
                {isSyncing ? 'Salvando...' : 'Alterar Senha'}
              </button>
            </div>
          </div>
        </div>
      )}
`;

if (!content.includes('resetPasswordMode &&')) {
  // Adicionar antes do último </div> do App (antes de export default)
  content = content.replace(
    /(\s*)<\/div>\s*\);\s*};?\s*export default App;/,
    `${resetModal}\n$1</div>\n  );\n};\n\nexport default App;`
  );
}

// Salvar arquivo modificado
fs.writeFileSync('App.tsx', content, 'utf8');
console.log('✅ App.tsx modificado com sucesso!');
console.log('📊 Tamanho final:', fs.statSync('App.tsx').size, 'bytes');