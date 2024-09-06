function splitIntoChannels(inputImage) {
    let redChannel = createImage(inputImage.width, inputImage.height);
    let greenChannel = createImage(inputImage.width, inputImage.height);
    let blueChannel = createImage(inputImage.width, inputImage.height);

    redChannel.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, redChannel.width, redChannel.height);
    greenChannel.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, greenChannel.width, greenChannel.height);
    blueChannel.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, blueChannel.width, blueChannel.height);

    redChannel.loadPixels();
    greenChannel.loadPixels();
    blueChannel.loadPixels();

    for (let i = 0; i < redChannel.pixels.length; i += 4) {
        // Isolate the red channel
        greenChannel.pixels[i] = 0;
        blueChannel.pixels[i] = 0;

        // Isolate the green channel
        redChannel.pixels[i + 1] = 0;
        blueChannel.pixels[i + 1] = 0;

        // Isolate the blue channel
        redChannel.pixels[i + 2] = 0;
        greenChannel.pixels[i + 2] = 0;
    }

    redChannel.updatePixels();
    greenChannel.updatePixels();
    blueChannel.updatePixels();

    return [redChannel, greenChannel, blueChannel];
}
