# ============================================================================
# TESTE RÁPIDO DO WEBHOOK - MyFitRout
# ============================================================================

# EDITE AQUI - Cole a URL do seu Vercel:
$webhookUrl = "https://myfitrout.com/api/lastlink-webhook"

# EDITE AQUI - Cole seu email:
$testEmail = "rh.alvarenga21@gmail.com"

Write-Host "`nTestando webhook do MyFitRout..." -ForegroundColor Cyan
Write-Host "URL: $webhookUrl" -ForegroundColor Yellow
Write-Host "Email: $testEmail`n" -ForegroundColor Yellow

# Criar payload de teste
$body = @{
    eventType = "Order.Success"
    Buyer = @{
        Email = $testEmail
        Name = "Teste Usuario"
    }
    Product = @{
        Id = "test_product_123"
    }
} | ConvertTo-Json

Write-Host "Enviando requisição..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest `
        -Uri $webhookUrl `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -UseBasicParsing
    
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "`n✅ SUCESSO!" -ForegroundColor Green
    Write-Host "Resposta:" -ForegroundColor Yellow
    Write-Host ($result | ConvertTo-Json -Depth 3) -ForegroundColor White
    
} catch {
    Write-Host "`n❌ ERRO!" -ForegroundColor Red
    Write-Host "Mensagem: $($_.Exception.Message)" -ForegroundColor Yellow
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "`nDetalhes do erro:" -ForegroundColor Yellow
        Write-Host $errorBody -ForegroundColor White
    }
}

Write-Host "`n"