$ErrorActionPreference = "Stop"

# Define the mapping of corrupted emojis to correct ones
$emojiMap = @{
    'ðŸŒ±' = '🌱'
    'ðŸŒ¾' = '🌾' 
    'ðŸ¥¥' = '🥥'
    'ðŸŒ¶ï¸' = '🌶️'
    'ðŸŒ' = '🌿'
    'ðŸ'°' = '💰'
    'ðŸŽ¯' = '🎯'
    'ðŸ'§' = '💧'
    'ðŸª' = '🏪'
    'âœ"' = '✓'
    'âœ…' = '✅'
    'âŒ' = '❌'
    'ðŸš«' = '🚫'
    'ðŸ"„' = '📄'
    'ðŸ˜ï¸' = '🏘️'
    'ðŸŒ¿' = '🌿'
    'âœ¨' = '✨'
    'ðŸ"ˆ' = '📈'
    'ðŸ'‹' = '👋'
    'ðŸ'©â€ðŸŒ¾' = '👩‍🌾'
    'ðŸ'¨â€ðŸŒ¾' = '👨‍🌾'
    'ðŸ"' = '📍'
    'ðŸ›¡ï¸' = '🛡️'
    'ðŸ''' = '👑'
    'ðŸ"' = '🔍'
    'ðŸšœ' = '🚜'
    'ðŸƒ' = '🍃'
    'ðŸ'¤' = '👤'
    'â€¢' = '•'
    'â­' = '⭐'
}

# Get all JSX files
$jsxFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.jsx"

foreach ($file in $jsxFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if file needs fixing
    $needsFixing = $false
    foreach ($corruptEmoji in $emojiMap.Keys) {
        if ($content.Contains($corruptEmoji)) {
            $needsFixing = $true
            break
        }
    }
    
    if ($needsFixing) {
        # Apply all emoji fixes
        foreach ($corruptEmoji in $emojiMap.Keys) {
            $correctEmoji = $emojiMap[$corruptEmoji]
            $content = $content.Replace($corruptEmoji, $correctEmoji)
        }
        
        # Write back to file
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed: $($file.FullName)" -ForegroundColor Green
    } else {
        Write-Host "No issues found in: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "Emoji fixing complete!" -ForegroundColor Green