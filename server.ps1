$port = 8084
$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server: http://localhost:$port/" -ForegroundColor Green

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  $res.Headers.Add("Access-Control-Allow-Origin", "*")
  if ($req.HttpMethod -eq "OPTIONS") { $res.StatusCode = 204; $res.Close(); continue }

  $path = $req.Url.AbsolutePath
  if ($path -eq "/") { $path = "/app.html" }
  $file = Join-Path $root $path.TrimStart('/')

  if (Test-Path $file -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $mime = @{
      '.html' = 'text/html; charset=utf-8'
      '.js'   = 'application/javascript; charset=utf-8'
      '.css'  = 'text/css; charset=utf-8'
      '.png'  = 'image/png'
      '.jpg'  = 'image/jpeg'
      '.gif'  = 'image/gif'
      '.ico'  = 'image/x-icon'
      '.svg'  = 'image/svg+xml'
    }
    if ($mime.ContainsKey($ext)) { $res.ContentType = $mime[$ext] }
    $data = [System.IO.File]::ReadAllBytes($file)
    $res.ContentLength64 = $data.Length
    $res.OutputStream.Write($data, 0, $data.Length)
  } else {
    $res.StatusCode = 404
    $msg = [Text.Encoding]::UTF8.GetBytes("404")
    $res.OutputStream.Write($msg, 0, $msg.Length)
  }
  $res.Close()
}
