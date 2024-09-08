function applyThresholdToColorSpace(sourceImage, thresholdValue, slider) {
    let resultImage = createImage(sourceImage.width, sourceImage.height);
    resultImage.copy(sourceImage, 0, 0, sourceImage.width, sourceImage.height, 0, 0, resultImage.width, resultImage.height);

    resultImage.loadPixels();
    for (let i = 0; i < resultImage.pixels.length; i += 4) {
        let redChannel = resultImage.pixels[i];
        let greenChannel = resultImage.pixels[i + 1];
        let blueChannel = resultImage.pixels[i + 2];

        // Compute the intensity based on RGB values
        let colorIntensity = calculateColorIntensity(redChannel, greenChannel, blueChannel);

        // Apply threshold based on slider position
        colorIntensity = (slider.value() > colorIntensity) ? 0 : colorIntensity;

        // Set the new pixel values after thresholding
        resultImage.pixels[i] = redChannel * (colorIntensity / 255);    // Red
        resultImage.pixels[i + 1] = greenChannel * (colorIntensity / 255); // Green
        resultImage.pixels[i + 2] = blueChannel * (colorIntensity / 255);  // Blue

        // Keep the alpha channel unchanged
        resultImage.pixels[i + 3] = resultImage.pixels[i + 3];
    }
    resultImage.updatePixels();

    return resultImage;
}

function calculateColorIntensity(r, g, b) {
    // Calculate intensity from RGB values
    return (r + g + b) / 1.7;
}

function applyTCbCrThreshold(sourceImage) {
    let thresholdValue = tcbrThresholdSlider.value(); 
    let tcbrConvertedImage = convertToTCbCr(sourceImage); 
    let thresholdedResult = applyThresholdToColorSpace(tcbrConvertedImage, thresholdValue, tcbrThresholdSlider);
    return thresholdedResult;
}

function applyHSVThreshold(sourceImage) {
    let hsvThresholdValue = hsvThresholdSlider.value(); 
    let hsvConvertedImage = convertToHSV(sourceImage); 
    let thresholdedResult = applyThresholdToColorSpace(hsvConvertedImage, hsvThresholdValue, hsvThresholdSlider);
    return thresholdedResult;
}

