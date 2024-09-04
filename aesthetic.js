function applyAestheticFilter(inputImage) {
    let outputImage = createImage(inputImage.width, inputImage.height);
    outputImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, outputImage.width, outputImage.height);

    // Step 1: Apply a color tint (e.g., a soft pink or teal tone)
    outputImage.loadPixels();
    for (let i = 0; i < outputImage.pixels.length; i += 4) {
        outputImage.pixels[i] += 30;    // Red Channel
        outputImage.pixels[i + 1] += 10; // Green Channel
        outputImage.pixels[i + 2] += 50; // Blue Channel
    }
    outputImage.updatePixels();

    // Step 2: Apply a vignette effect
    outputImage = applyVignette(outputImage);

    // Step 3: Apply a slight blur to soften the image
    outputImage = applyGaussianBlur(outputImage);

    return outputImage;
}

function applyVignette(inputImage) {
    let outputImage = createImage(inputImage.width, inputImage.height);
    outputImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, outputImage.width, outputImage.height);

    let centerX = inputImage.width / 2;
    let centerY = inputImage.height / 2;
    let maxDistance = dist(0, 0, centerX, centerY);

    outputImage.loadPixels();
    for (let x = 0; x < inputImage.width; x++) {
        for (let y = 0; y < inputImage.height; y++) {
            let d = dist(x, y, centerX, centerY);
            let vignetteFactor = map(d, 0, maxDistance, 1, 0.4);  // Vignette strength

            let index = (y * inputImage.width + x) * 4;
            outputImage.pixels[index] *= vignetteFactor;    // Red Channel
            outputImage.pixels[index + 1] *= vignetteFactor; // Green Channel
            outputImage.pixels[index + 2] *= vignetteFactor; // Blue Channel
        }
    }
    outputImage.updatePixels();

    return outputImage;
}
