// Function for black and white thresholding
function applyBWThreshold(inputImage, threshold) {
    let bwImage = createImage(inputImage.width, inputImage.height);
    bwImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, bwImage.width, bwImage.height);

    bwImage.loadPixels();
    for (let i = 0; i < bwImage.pixels.length; i += 4) {
        let r = bwImage.pixels[i];
        let g = bwImage.pixels[i + 1];
        let b = bwImage.pixels[i + 2];

        // Calculate the grayscale value using the luminosity formula
        let grayValue = 0.299 * r + 0.587 * g + 0.114 * b;

        // If grayscale value exceeds the threshold, set the pixel to white, else black
        let binaryColor = grayValue > threshold ? 255 : 0;

        // Apply binary color to all channels (R, G, B)
        bwImage.pixels[i] = binaryColor;
        bwImage.pixels[i + 1] = binaryColor;
        bwImage.pixels[i + 2] = binaryColor;

        // Keep the original alpha value
        bwImage.pixels[i + 3] = bwImage.pixels[i + 3];
    }
    bwImage.updatePixels();
    
    return bwImage;
}

// Function to Thresholding depths 
function applyColorChannelThreshold(inputImage, threshold) {
    let colorThresholdedImg = createImage(inputImage.width, inputImage.height);
    colorThresholdedImg.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, colorThresholdedImg.width, colorThresholdedImg.height);

    colorThresholdedImg.loadPixels();
    for (let i = 0; i < colorThresholdedImg.pixels.length; i += 4) {
        let r = colorThresholdedImg.pixels[i];
        let g = colorThresholdedImg.pixels[i + 1];
        let b = colorThresholdedImg.pixels[i + 2];

        // Apply thresholds to each channel using sliders
        r = (redSlider.value() > r) ? 0 : r;
        g = (greenSlider.value() > g) ? 0 : g;
        b = (blueSlider.value() > b) ? 0 : b;

        // Set thresholded values to pixels
        colorThresholdedImg.pixels[i] = r;
        colorThresholdedImg.pixels[i + 1] = g;
        colorThresholdedImg.pixels[i + 2] = b;

        // Preserve the original alpha value
        colorThresholdedImg.pixels[i + 3] = colorThresholdedImg.pixels[i + 3];
    }
    colorThresholdedImg.updatePixels();

    return colorThresholdedImg;
}