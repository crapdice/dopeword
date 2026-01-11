$url = "https://powerpacks.gamestop.com/packs"
$outputPath = "c:/Users/zackf/.gemini/antigravity/playground/synthetic-observatory/site_content.html"

Add-Type -AssemblyName System.Net.Http

# Define headers to mimic a modern Chrome browser
$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
    "Accept-Encoding" = "gzip, deflate, br"
    "Accept-Language" = "en-US,en;q=0.9"
    "Cache-Control" = "max-age=0"
    "Upgrade-Insecure-Requests" = "1"
    "Sec-Ch-Ua" = '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"'
    "Sec-Ch-Ua-Mobile" = "?0"
    "Sec-Ch-Ua-Platform" = '"Windows"'
    "Sec-Fetch-Dest" = "document"
    "Sec-Fetch-Mode" = "navigate"
    "Sec-Fetch-Site" = "none"
    "Sec-Fetch-User" = "?1"
}

try {
    # Using .NET HttpClient for better control and handling (some sites block Invoke-WebRequest's default behavior)
    $client = New-Object System.Net.Http.HttpClient
    
    foreach ($key in $headers.Keys) {
        $client.DefaultRequestHeaders.TryAddWithoutValidation($key, $headers[$key]) | Out-Null
    }

    $response = $client.GetAsync($url).Result
    
    if ($response.IsSuccessStatusCode) {
        $content = $response.Content.ReadAsStringAsync().Result
        $content | Out-File -FilePath $outputPath -Encoding UTF8
        Write-Host "Successfully fetched content to $outputPath"
    }
    else {
        Write-Host "Failed with status code: $($response.StatusCode)"
        # Print valid headers to debug
        # $response.Headers | Format-List
    }
}
catch {
    Write-Host "An error occurred: $_"
}
