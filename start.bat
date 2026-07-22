@echo off
cd /d "%~dp0"
start /min powershell -NoExit -ExecutionPolicy Bypass -Command "$l=New-Object System.Net.HttpListener;$l.Prefixes.Add('http://localhost:8084/');$l.Start();Write-Host 'Server: http://localhost:8084/' -Fore Green;while($l.IsListening){$c=$l.GetContext();$p=$c.Response;$f=$PWD.Path+$c.Request.Url.AbsolutePath.Replace('/','\');if($c.Request.Url.AbsolutePath -eq '/'){$f=$PWD.Path+'\index.html'};$p.Headers.Add('Access-Control-Allow-Origin','*');if(Test-Path $f -PathType Leaf){$p.ContentType='text/html; charset=utf-8';if($f -match '\.js$'){$p.ContentType='application/javascript; charset=utf-8'};if($f -match '\.css$'){$p.ContentType='text/css; charset=utf-8'};$d=[IO.File]::ReadAllBytes($f);$p.ContentLength64=$d.Length;$p.OutputStream.Write($d,0,$d.Length)}else{$p.StatusCode=404};$p.Close()}"
timeout /t 2 /nobreak >nul
start http://localhost:8084/
