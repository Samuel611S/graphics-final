function applyGlitchFilter(inputImage) {
    let outputImage = createImage(inputImage.width, inputImage.height);
    outputImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, outputImage.width, outputImage.height);

    // Step 1: Randomly shift rows
    for (let y = 0; y < outputImage.height; y += 10) {
        let shift = int(random(-20, 20));
        outputImage.copy(outputImage, 0, y, outputImage.width, 10, shift, y, outputImage.width, 10);
    }

    // Step 2: Randomly shift columns
    for (let x = 0; x < outputImage.width; x += 10) {
        let shift = int(random(-10, 10));
        outputImage.copy(outputImage, x, 0, 10, outputImage.height, x, shift, 10, outputImage.height);
    }

    // Step 3: Add random noise
    outputImage.loadPixels();
    for (let i = 0; i < outputImage.pixels.length; i += 4) {
        if (random(1) < 0.1) { // 10% chance to add noise
            let noiseValue = int(random(-50, 50));
            outputImage.pixels[i] += noiseValue;     // Red Channel
            outputImage.pixels[i + 1] += noiseValue; // Green Channel
            outputImage.pixels[i + 2] += noiseValue; // Blue Channel
        }
    }
    outputImage.updatePixels();

    // Step 4: Apply a final random color offset
    let glitchRed = outputImage.get();
    let glitchGreen = outputImage.get();
    let glitchBlue = outputImage.get();

    glitchRed.filter(THRESHOLD);
    glitchGreen.filter(INVERT);
    glitchBlue.filter(POSTERIZE, 5);

    outputImage.blend(glitchRed, 0, 0, outputImage.width, outputImage.height, int(random(-10, 10)), int(random(-10, 10)), outputImage.width, outputImage.height, ADD);
    outputImage.blend(glitchGreen, 0, 0, outputImage.width, outputImage.height, int(random(-5, 5)), int(random(-5, 5)), outputImage.width, outputImage.height, LIGHTEST);
    outputImage.blend(glitchBlue, 0, 0, outputImage.width, outputImage.height, int(random(-3, 3)), int(random(-3, 3)), outputImage.width, outputImage.height, DARKEST);

    return outputImage;
}
