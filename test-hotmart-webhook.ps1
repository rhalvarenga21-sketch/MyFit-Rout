# =============================================================
# MyFitRout - Teste do Webhook Hotmart
# Simula payloads reais da Hotmart v2
# =============================================================

# ⚠️  EDITE ESTAS VARIÁVEIS:
$webhookUrl = "https://myfitrout-app.vercel.app/api/hotmart-webhook"
$testEmail = "rh.alvarenga21@gmail.com"
$testName = "Rafael Alvarenga"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MyFitRout - Teste Webhook Hotmart" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "URL: $webhookUrl" -ForegroundColor Gray
Write-Host "Email: $testEmail" -ForegroundColor Gray
Write-Host ""

# ---- TESTE 1: Health Check ----
Write-Host "TESTE 1: Health Check (GET)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method GET
    Write-Host "  Status: $($response.status)" -ForegroundColor Green
    $response.config.PSObject.Properties | ForEach-Object {
        Write-Host "  $($_.Name): $($_.Value)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ERRO: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ---- TESTE 2: PURCHASE_APPROVED (PRO Mensal) ----
Write-Host "TESTE 2: PURCHASE_APPROVED (PRO Mensal)" -ForegroundColor Yellow
$payload2 = @{
    id = "test-" + [guid]::NewGuid().ToString()
    creation_date = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    event = "PURCHASE_APPROVED"
    version = "2.0.0"
    data = @{
        product = @{
            id = 7418753
            name = "MyFitRout"
        }
        buyer = @{
            email = $testEmail
            name = $testName
            first_name = "Rafael"
            last_name = "Alvarenga"
            checkout_phone = "11980517440"
            document = "12345678900"
        }
        purchase = @{
            transaction = "HP" + (Get-Random -Maximum 99999999)
            status = "approved"
            price = @{
                value = 59.90
                currency_value = "BRL"
            }
            payment = @{
                type = "CREDIT_CARD"
                installments_number = 1
            }
            offer = @{
                code = "a24mmass"
            }
            subscription = @{
                subscriber_code = "SUB" + (Get-Random -Maximum 99999999)
                status = "active"
                plan = @{
                    id = 1
                    name = "PRO Mensal"
                }
            }
        }
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $payload2 -ContentType "application/json"
    Write-Host "  Sucesso: $($response.success)" -ForegroundColor Green
    Write-Host "  UserID: $($response.userId)" -ForegroundColor Gray
    Write-Host "  Novo usuario: $($response.isNewUser)" -ForegroundColor Gray
    Write-Host "  Email ID: $($response.emailId)" -ForegroundColor Gray
    Write-Host "  Plano: $($response.plan)" -ForegroundColor Gray
    Write-Host "  Duracao: $($response.duration)" -ForegroundColor Gray
} catch {
    Write-Host "  ERRO: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        Write-Host "  Detalhes: $body" -ForegroundColor Red
    }
}
Write-Host ""

# ---- TESTE 3: PURCHASE_APPROVED (Essential Anual) ----
Write-Host "TESTE 3: PURCHASE_APPROVED (Essential Anual)" -ForegroundColor Yellow
$payload3 = @{
    id = "test-" + [guid]::NewGuid().ToString()
    creation_date = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    event = "PURCHASE_APPROVED"
    version = "2.0.0"
    data = @{
        product = @{
            id = 7418753
            name = "MyFitRout"
        }
        buyer = @{
            email = "teste-essential@example.com"
            name = "Teste Essential"
            first_name = "Teste"
        }
        purchase = @{
            transaction = "HP" + (Get-Random -Maximum 99999999)
            status = "approved"
            price = @{ value = 297.00 }
            payment = @{ type = "PIX" }
            offer = @{ code = "njxtdc3t" }
        }
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $payload3 -ContentType "application/json"
    Write-Host "  Sucesso: $($response.success)" -ForegroundColor Green
    Write-Host "  Plano: $($response.plan)" -ForegroundColor Gray
} catch {
    Write-Host "  ERRO: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ---- TESTE 4: SUBSCRIPTION_CANCELLATION ----
Write-Host "TESTE 4: SUBSCRIPTION_CANCELLATION" -ForegroundColor Yellow
$payload4 = @{
    id = "test-" + [guid]::NewGuid().ToString()
    creation_date = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    event = "SUBSCRIPTION_CANCELLATION"
    version = "2.0.0"
    data = @{
        buyer = @{
            email = "teste-essential@example.com"
            name = "Teste Essential"
        }
        subscription = @{
            subscriber_code = "SUB12345"
            status = "canceled"
        }
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $payload4 -ContentType "application/json"
    Write-Host "  Sucesso: $($response.success)" -ForegroundColor Green
    Write-Host "  Evento: $($response.event)" -ForegroundColor Gray
} catch {
    Write-Host "  ERRO: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# ---- TESTE 5: Evento desconhecido ----
Write-Host "TESTE 5: Evento desconhecido (deve ignorar)" -ForegroundColor Yellow
$payload5 = @{
    id = "test-" + [guid]::NewGuid().ToString()
    event = "PURCHASE_DELAYED"
    version = "2.0.0"
    data = @{
        buyer = @{ email = $testEmail; name = $testName }
    }
} | ConvertTo-Json -Depth 5

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $payload5 -ContentType "application/json"
    Write-Host "  Sucesso: $($response.success)" -ForegroundColor Green
    Write-Host "  Mensagem: $($response.message)" -ForegroundColor Gray
} catch {
    Write-Host "  ERRO: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Testes concluidos!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "Verifique:" -ForegroundColor Yellow
Write-Host "  1. Logs Vercel: https://vercel.com" -ForegroundColor Gray
Write-Host "  2. Resend: https://resend.com/emails" -ForegroundColor Gray
Write-Host "  3. Supabase: Authentication > Users" -ForegroundColor Gray
Write-Host "  4. Caixa de entrada: $testEmail" -ForegroundColor Gray
Write-Host ""