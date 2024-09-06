function applyVignetteFilter(inputImage) {
    let outputImage = createImage(inputImage.width, inputImage.height);
    outputImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, outputImage.width, outputImage.height);

    outputImage.loadPixels();
    let centerX = outputImage.width / 2;
    let centerY = outputImage.height / 2;
    let maxDist = dist(0, 0, centerX, centerY);
    let vignetteStrength = 0.75; // Adjust strength of vignette effect

    for (let y = 0; y < outputImage.height; y++) {
        for (let x = 0; x < outputImage.width; x++) {
            let d = dist(x, y, centerX, centerY);
            let factor = constrain(d / maxDist, 0, 1);
            let index = (x + y * outputImage.width) * 4;
            
            // Calculate vignette effect
            let vignetteFactor = 1 - Math.pow(factor, 2) * vignetteStrength;
            
            outputImage.pixels[index] *= vignetteFactor;     // Red Channel
            outputImage.pixels[index + 1] *= vignetteFactor; // Green Channel
            outputImage.pixels[index + 2] *= vignetteFactor; // Blue Channel
        }
    }
    outputImage.updatePixels();

    return outputImage;
}
