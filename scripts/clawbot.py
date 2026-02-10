
import requests
import json
import time
from datetime import datetime

# CONFIGURAÇÃO
API_URL = "https://myfitrout.com/api/metrics?key=secret-clawbot-key"
# Se quiser enviar email real, precisaria de SMTP ou API (ex: SendGrid/Resend)

def run_clawbot():
    print(f"[{datetime.now()}] 🤖 Clawbot Training - Iniciando varredura...")
    
    try:
        # 1. Buscar dados da API
        print(f"📡 Conectando a {API_URL}...")
        response = requests.get(API_URL)
        
        if response.status_code != 200:
            print(f"❌ Erro na API: {response.status_code} - {response.text}")
            return

        data = response.json()
        leads = data.get('leads', [])
        
        print(f"📊 Total de eventos nas últimas 24h: {len(leads)}")
        
        # 2. Filtrar Leads com Email (Campo 'externals')
        captured_emails = []
        for event in leads:
            email = event.get('externals')
            # Se tiver email e não for teste
            if email and '@' in email:
                captured_emails.append({
                    'email': email,
                    'plan': event.get('plan'),
                    'time': event.get('created_at')
                })
        
        print(f"🎯 EMAILS CAPTURADOS (Leads Quentes): {len(captured_emails)}")
        
        if not captured_emails:
            print("😴 Nenhum email novo para processar.")
            return

        # 3. Processar (Simulação de Envio)
        print("\n--- PROCESSAMENTO DE DISPARO ---")
        for lead in captured_emails:
            print(f"🚀 Enviando email de recuperação para: {lead['email']} (Plano: {lead['plan']})")
            # AQUI entraria o código de envio real de email
            # send_email_fn(lead['email'], ...)
            time.sleep(0.5) 
            
        print("\n✅ Ciclo concluído com sucesso.")

    except Exception as e:
        print(f"❌ Erro crítico: {e}")

if __name__ == "__main__":
    run_clawbot()
