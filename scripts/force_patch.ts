import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_PATH = path.join(__dirname, '..', 'App.tsx');

const newLogic = `              onComplete={async (sessionData) => {
                // ⚡ ZERO DATA LOSS SYSTEM - Backup local SEMPRE primeiro!
                setIsSyncing(true);
                
                try {
                  // Step 1: Backup local IMEDIATO (nunca perde dados!)
                  console.log('💾 Step 1/4: Creating local backup...');
                  const backupId = backupWorkoutLocally(currentUser!.id, sessionData);
                  console.log('✅ Backup created:', backupId);
                  
                  // Step 2: Sync to cloud with automatic retry (3 attempts)
                  console.log('☁️ Step 2/4: Syncing to cloud with retry...');
                  const result = await syncWorkoutWithRetry(sessionData, backupId);
                  
                  // Step 3: Update completed days in profile
                  console.log('📅 Step 3/4: Updating completed days...');
                  const today = new Date().toISOString().split('T')[0];
                  if (profile) {
                    const updatedDays = profile.completedDays.includes(today)
                      ? profile.completedDays
                      : [...profile.completedDays, today];

                    const updatedProfile = { ...profile, completedDays: updatedDays };
                    await saveProfile(updatedProfile);
                    console.log('✅ Profile updated');
                  }
                  
                  setIsSyncing(false);
                  
                  // Step 4: Notify user about sync status
                  console.log('📢 Step 4/4: Notifying user...');
                  if (result.success) {
                    console.log('✅ Workout saved successfully to cloud!');
                  } else {
                    console.warn('⚠️ Cloud sync failed, but workout is backed up locally');
                    alert(
                      '⚠️ Treino Salvo Localmente!\\n\\n' +
                      'Não foi possível sincronizar com a nuvem agora, mas seus dados estão SEGUROS no seu dispositivo.\\n\\n' +
                      'Tentaremos sincronizar automaticamente na próxima vez que você abrir o app.\\n\\n' +
                      \`Detalhes: \${result.error?.message || 'Conexão instável'}\`
                    );
                  }
                  
                  // Navigate to completion screen
                  setCompletedSession(sessionData);
                  setView('workout_completed');
                  
                } catch (err) {
                  console.error('❌ CRITICAL ERROR saving workout:', err);
                  setIsSyncing(false);
                  
                  alert(
                    '❌ Erro Crítico ao Salvar Treino!\\n\\n' +
                    'Por favor, NÃO feche o app e tire um screenshot desta tela.\\n' +
                    'Entre em contato com o suporte imediatamente.\\n\\n' +
                    \`Erro: \${err}\\n\\n\` +
                    'Seus dados podem estar no backup local.'
                  );
                }
              }}`;

try {
    let content = fs.readFileSync(APP_PATH, 'utf8');

    // Identificar o bloco antigo usando linhas fixas que sabemos que existem
    const startMarker = `onComplete={async (sessionData) => {`;
    const endMarker = `setView('workout_completed');
              }}`;

    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) {
        console.error('❌ Não foi possível encontrar o início do bloco onComplete');
        process.exit(1);
    }

    // Procura o fechamento da função
    // Vamos procurar o 'onCancel' que vem logo depois para garantir que pegamos o bloco todo
    const nextPropMarker = `onCancel={() => setView('home')}`;
    const endIndex = content.indexOf(nextPropMarker, startIndex);

    if (endIndex === -1) {
        console.error('❌ Não foi possível encontrar o final do bloco');
        process.exit(1);
    }

    // Precisamos voltar um pouco do endIndex para pegar o fechamento '}}' antes do onCancel
    // O bloco termina antes do onCancel
    // Vamos pegar todo conteúdo entre o início e o onCancel e substituir

    const contentBefore = content.substring(0, startIndex);
    const contentAfter = content.substring(endIndex); // Começa no onCancel

    // O novo conteúdo deve encaixar perfeitamente
    // Precisamos apenas garantir que o newLogic termina onde o antigo terminava
    // O newLogic termina com "}}"

    const newContent = contentBefore + newLogic + '\n              ' + contentAfter;

    fs.writeFileSync(APP_PATH, newContent, 'utf8');
    console.log('✅ Patch aplicado com SUCESSO!');

} catch (error) {
    console.error('Erro ao aplicar patch:', error);
}
