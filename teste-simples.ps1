# Teste SIMPLES - Ficha Rapida
Write-Host "=== TESTE RAPIDO ===" -ForegroundColor Cyan
Write-Host ""

$API_URL = "http://localhost:8080/api"

# Teste 1: Backend responde?
Write-Host "1. Testando backend..." -ForegroundColor Yellow
try {
    $test = Invoke-WebRequest -Uri "$API_URL/fichas" -UseBasicParsing -TimeoutSec 3
    Write-Host "   OK - Backend rodando" -ForegroundColor Green
} catch {
    Write-Host "   ERRO - Backend NAO esta rodando" -ForegroundColor Red
    Write-Host "   Inicie com: cd backend && ./mvnw spring-boot:run" -ForegroundColor Yellow
    exit
}

Write-Host ""

# Teste 2: Criar ficha
Write-Host "2. Criando ficha de teste..." -ForegroundColor Yellow
$ficha = '{"nomeVitima":"Teste","idadeVitima":30,"dataAtendimento":"2025-01-01","motivoSolicitacao":"Teste","status":"Em andamento"}'

try {
    $result = Invoke-RestMethod -Uri "$API_URL/fichas" -Method Post -Body $ficha -ContentType "application/json"
    Write-Host "   OK - Ficha criada" -ForegroundColor Green
    Write-Host "   ID: $($result.id)" -ForegroundColor Cyan
    
    $fichaId = $result.id
    
    if ($fichaId) {
        Write-Host ""
        Write-Host "3. Testando PDF..." -ForegroundColor Yellow
        
        try {
            $pdfFile = "$env:TEMP\teste_$fichaId.pdf"
            Invoke-WebRequest -Uri "$API_URL/fichas/$fichaId/pdf" -OutFile $pdfFile
            
            $tamanho = (Get-Item $pdfFile).Length
            Write-Host "   OK - PDF gerado ($tamanho bytes)" -ForegroundColor Green
            
            Write-Host ""
            Write-Host "=== SUCESSO! ===" -ForegroundColor Green
            Write-Host "Tudo funcionando corretamente!" -ForegroundColor Green
            
        } catch {
            Write-Host "   ERRO - Nao conseguiu gerar PDF" -ForegroundColor Red
            Write-Host "   Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
            Write-Host ""
            Write-Host "PROBLEMA: PdfService pode nao estar implementado" -ForegroundColor Yellow
        }
    }
    
} catch {
    Write-Host "   ERRO ao criar ficha" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
