$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodeExecutable = if ($nodeCommand) { $nodeCommand.Source } else { Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' }
if (-not (Test-Path -LiteralPath $nodeExecutable)) { throw 'Instale Node.js 24 ou superior e execute novamente.' }
$nodeVersion = & $nodeExecutable -p 'parseInt(process.versions.node)'
if ([int]$nodeVersion -lt 24) { throw 'Este projeto precisa do Node.js 24 ou superior.' }
& $nodeExecutable server/index.cjs
