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

  # Proxy: /inv?sku=XXX -> internal WMS
  if ($path -eq "/inv") {
    $sku = $req.QueryString["sku"]
    if ($sku) {
      $invUrl = "https://internal.buymed.co.th/wms/BK/inventory/sku/detail?sku=$sku&warehouseCode=BK"
      try {
        $wc = New-Object System.Net.WebClient
        $wc.UseDefaultCredentials = $true
        $wc.Headers.Add("User-Agent", "Mozilla/5.0")
        $html = $wc.DownloadString($invUrl)
        $res.ContentType = "application/json; charset=utf-8"
        # Try to extract location:qty pairs
        $locations = @()
        # Pattern: BK02/BK01 + 2 digits + letter + 2 digits + letter + 2 digits
        $pattern = '(BK\d{2}[A-Z]\d{2}[A-Z]\d{2})'
        $matches = [regex]::Matches($html, $pattern)
        foreach ($m in $matches) {
          $loc = $m.Groups[1].Value
          # Find qty near location
          $after = $html.Substring($m.Index + $m.Length, [Math]::Min(80, $html.Length - $m.Index - $m.Length))
          $qm = [regex]::Match($after, '(\d+)')
          $qty = if ($qm.Success) { $qm.Groups[1].Value } else { "?" }
          $locations += "$loc`: $qty"
        }
        if ($locations.Count -gt 0) {
          $json = @{ locations = $locations -join '; ' } | ConvertTo-Json
        } else {
          $json = @{ locations = ""; raw = $html.Substring(0, [Math]::Min(300, $html.Length)) } | ConvertTo-Json
        }
        $bytes = [Text.Encoding]::UTF8.GetBytes($json)
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      } catch {
        $res.StatusCode = 502
        $err = "Proxy error: $_"
        $bytes = [Text.Encoding]::UTF8.GetBytes($err)
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } else {
      $res.StatusCode = 400
      $msg = [Text.Encoding]::UTF8.GetBytes("Missing sku param")
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
    $res.Close()
    continue
  }

  # Static files
  if ($path -eq "/") { $path = "/index.html" }
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
