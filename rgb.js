function separateRGBChannels(sourceImage) {
    // Create separate images for red, green, and blue channels
    let redImg = createImage(sourceImage.width, sourceImage.height);
    let greenImg = createImage(sourceImage.width, sourceImage.height);
    let blueImg = createImage(sourceImage.width, sourceImage.height);

    redImg.copy(sourceImage, 0, 0, sourceImage.width, sourceImage.height, 0, 0, redImg.width, redImg.height);
    greenImg.copy(sourceImage, 0, 0, sourceImage.width, sourceImage.height, 0, 0, greenImg.width, greenImg.height);
    blueImg.copy(sourceImage, 0, 0, sourceImage.width, sourceImage.height, 0, 0, blueImg.width, blueImg.height);

    redImg.loadPixels();
    greenImg.loadPixels();
    blueImg.loadPixels();

    // Loop through pixels and modify channels
    for (let i = 0; i < redImg.pixels.length; i += 4) {
        // Keep only red in redImg
        greenImg.pixels[i] = 0;
        blueImg.pixels[i] = 0;

        // Keep only green in greenImg
        redImg.pixels[i + 1] = 0;
        blueImg.pixels[i + 1] = 0;

        // Keep only blue in blueImg
        redImg.pixels[i + 2] = 0;
        greenImg.pixels[i + 2] = 0;
    }

    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();

    return [redImg, greenImg, blueImg];
}
