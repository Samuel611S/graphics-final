function applyColorShiftingFilter(inputImage, shiftAmount) {
    let outputImage = createImage(inputImage.width, inputImage.height);
    outputImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, outputImage.width, outputImage.height);

    outputImage.loadPixels();
    for (let i = 0; i < outputImage.pixels.length; i += 4) {
        outputImage.pixels[i] = (outputImage.pixels[i] + shiftAmount) % 256;        // Red Channel
        outputImage.pixels[i + 1] = (outputImage.pixels[i + 1] + shiftAmount) % 256; // Green Channel
        outputImage.pixels[i + 2] = (outputImage.pixels[i + 2] + shiftAmount) % 256; // Blue Channel
    }
    outputImage.updatePixels();

    return outputImage;
}
