function grayscaleConversion(sourceImage) {
    let grayImage = createImage(sourceImage.width, sourceImage.height);
    grayImage.copy(sourceImage, 0, 0, sourceImage.width, sourceImage.height, 0, 0, grayImage.width, grayImage.height);

    grayImage.loadPixels();
    for (let i = 0; i < grayImage.pixels.length; i += 4) {
        let grayValue = 0.3 * grayImage.pixels[i] + 0.59 * grayImage.pixels[i + 1] + 0.11 * grayImage.pixels[i + 2];
        grayImage.pixels[i] = grayValue;       // Red channel
        grayImage.pixels[i + 1] = grayValue;   // Green channel
        grayImage.pixels[i + 2] = grayValue;   // Blue channel
    }
    grayImage.updatePixels();

    return grayImage;
}


function pixelateImage(sourceImage, blockSize) {
    let pixelatedImage = sourceImage.get();
    pixelatedImage.loadPixels();

    for (let y = 0; y < pixelatedImage.height; y += blockSize) {
        for (let x = 0; x < pixelatedImage.width; x += blockSize) {
            let redSum = 0, greenSum = 0, blueSum = 0;

            // Collect RGB values for the current block
            for (let i = 0; i < blockSize; i++) {
                for (let j = 0; j < blockSize; j++) {
                    let index = ((y + j) * pixelatedImage.width + (x + i)) * 4;
                    redSum += pixelatedImage.pixels[index];
                    greenSum += pixelatedImage.pixels[index + 1];
                    blueSum += pixelatedImage.pixels[index + 2];
                }
            }

            // Compute average color for the block
            let avgRed = redSum / (blockSize * blockSize);
            let avgGreen = greenSum / (blockSize * blockSize);
            let avgBlue = blueSum / (blockSize * blockSize);

            // Set each pixel in the block to the average color
            for (let i = 0; i < blockSize; i++) {
                for (let j = 0; j < blockSize; j++) {
                    let index = ((y + j) * pixelatedImage.width + (x + i)) * 4;
                    pixelatedImage.pixels[index] = avgRed;
                    pixelatedImage.pixels[index + 1] = avgGreen;
                    pixelatedImage.pixels[index + 2] = avgBlue;
                }
            }
        }
    }

    pixelatedImage.updatePixels();
    return pixelatedImage;
}
