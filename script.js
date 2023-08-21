const foregroundInput = document.getElementById("foreground-input");
const backgroundInput = document.getElementById("background-input");
const ratioOutput = document.getElementById("ratio-output");

function hexToRgb(hex) {
    // Convert a hex color to RGB values
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function getRelativeLuminance(rgb) {
    // Calculate relative luminance
    const [r, g, b] = rgb.map((c) => {
        const sRGB = c / 255;
        return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio() {
    var foreground = foregroundInput.value;
    var background = backgroundInput.value;

    if (foreground && background) {
        // Calculate contrast ratio
        const fgRgb = hexToRgb(foreground);
        const bgRgb = hexToRgb(background);
    
        const fgLuminance = getRelativeLuminance(fgRgb);
        const bgLuminance = getRelativeLuminance(bgRgb);
    
        var contrastRatio = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
        contrastRatio = contrastRatio.toFixed(2);

        ratioOutput.innerText = contrastRatio;

        document.getElementById("ratio-output-card").style.opacity = "1";
    }
}