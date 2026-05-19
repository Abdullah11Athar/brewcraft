param(
    [string]$Domain = "",
    [string[]]$PreferredNames = @("BrewCraft","BrewCraftCoffee","BrewCraft-coffee","BrewCraftSite")
)

Set-Location -Path $PSScriptRoot

Write-Host "Starting Vercel deploy attempts..." -ForegroundColor Cyan

foreach ($name in $PreferredNames) {
    Write-Host "Trying project name: $name" -ForegroundColor Yellow
    $cliName = $name.ToLower()
    $output = & npx vercel --prod --yes --name $cliName 2>&1
    $exit = $LASTEXITCODE
    $joined = ($output -join "`n")
    if ($exit -eq 0) {
        Write-Host "Deployment succeeded with project name: $name" -ForegroundColor Green
        Write-Host $joined
        if ($Domain -ne "") {
            Write-Host "Attempting to add domain $Domain to the project..." -ForegroundColor Cyan
            $domainOut = & npx vercel domains add $Domain 2>&1
            if ($LASTEXITCODE -eq 0) { Write-Host "Domain added (you may need to verify DNS)." -ForegroundColor Green } else { Write-Host ($domainOut -join "`n") -ForegroundColor Red }
        }
        exit 0
    } else {
        if ($joined -match "taken|already in use|is not available|is already taken") {
            Write-Host "Name $name not available, trying next..." -ForegroundColor Magenta
            continue
        } else {
            Write-Host "Deployment failed for name ${name}:" -ForegroundColor Red
            Write-Host $joined
            exit $exit
        }
    }
}

Write-Host "All preferred names failed. Consider choosing a different project name or run the script interactively." -ForegroundColor Red
exit 1
