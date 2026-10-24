# =====================================================
# MyFitRout - Desactivar Trial de 7 Dias (Reversível)
# Muda isTrialExpired para sempre retornar false
# =====================================================

import shutil
import re
from datetime import datetime
from pathlib import Path

# Cores
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
CYAN = '\033[96m'
RESET = '\033[0m'

def main():
    print(f"\n{CYAN}{'='*60}")
    print("  MyFitRout - Desactivar Trial de 7 Dias")
    print("  Abordagem: Cirurgica (Reversivel)")
    print(f"{'='*60}{RESET}\n")

    filepath = Path('App.tsx')

    # Verificar ficheiro
    if not filepath.exists():
        print(f"{RED}ERRO: App.tsx nao encontrado!{RESET}")
        print(f"   Correr este script dentro de: C:\\Users\\C5388757\\Documents\\MyFit-Rout")
        return

    # Backup
    timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
    backup_path = Path(f'App.tsx.backup-{timestamp}')
    shutil.copy(filepath, backup_path)
    print(f"{GREEN}Backup criado: {backup_path}{RESET}\n")

    # Ler conteúdo
    content = filepath.read_text(encoding='utf-8')

    # ─────────────────────────────────────────────────
    # A MUDANCA: forcar isTrialExpired a ser sempre false
    # ─────────────────────────────────────────────────
    # Padrao original:
    #   const isTrialExpired = trialRemaining?.expired || false;
    # Vira:
    #   const isTrialExpired = false; // TRIAL DESACTIVADO (freemium mode)

    old_line = "const isTrialExpired = trialRemaining?.expired || false;"
    new_line = "const isTrialExpired = false; // TRIAL DESACTIVADO (freemium mode) - reverter trocando esta linha"

    if old_line not in content:
        print(f"{RED}ERRO: Linha do trial nao encontrada!{RESET}")
        print(f"   Procurava: {old_line}")
        print(f"   O codigo pode ter sido alterado. Abortar.")
        return

    # Verificar se ja foi aplicado
    if new_line in content:
        print(f"{YELLOW}AVISO: Parece que o patch ja foi aplicado antes.{RESET}")
        print(f"   Nao ha nada a fazer.")
        return

    # Aplicar mudanca
    new_content = content.replace(old_line, new_line)

    # Gravar
    filepath.write_text(new_content, encoding='utf-8')

    print(f"{GREEN}Patch aplicado com sucesso!{RESET}\n")
    print(f"{CYAN}O QUE MUDOU:{RESET}")
    print(f"  ANTES: {old_line}")
    print(f"  DEPOIS: {new_line}\n")

    print(f"{YELLOW}PROXIMOS PASSOS:{RESET}")
    print(f"  1. Testar localmente: npm run dev")
    print(f"  2. Verificar que utilizadores ja nao sao bloqueados")
    print(f"  3. Se estiver tudo bem: git add App.tsx && git commit -m 'feat: freemium mode - disable 7-day trial' && git push")
    print(f"  4. Vercel fara o deploy automatico em ~2 minutos\n")

    print(f"{CYAN}PARA REVERTER (se precisares):{RESET}")
    print(f"  Opcao 1 (restaurar backup):")
    print(f"    Copy-Item {backup_path} App.tsx -Force")
    print(f"  Opcao 2 (editar manualmente):")
    print(f"    Trocar a linha de volta para: {old_line}\n")

if __name__ == '__main__':
    main()