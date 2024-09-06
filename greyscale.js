function convertToGrayscale(inputImage) {
    let grayscaleImage = createImage(inputImage.width, inputImage.height);
    grayscaleImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, grayscaleImage.width, grayscaleImage.height);

    grayscaleImage.loadPixels();
    for (let i = 0; i < grayscaleImage.pixels.length; i += 4) {
        let grayscaleValue = 0.3 * grayscaleImage.pixels[i] + 0.59 * grayscaleImage.pixels[i + 1] + 0.11 * grayscaleImage.pixels[i + 2];
        grayscaleImage.pixels[i] = grayscaleValue;
        grayscaleImage.pixels[i + 1] = grayscaleValue;
        grayscaleImage.pixels[i + 2] = grayscaleValue;
    }
    grayscaleImage.updatePixels();

    return grayscaleImage;
}


function convertToPixelate(inputImage, pixelSize) {
    let pixelatedImg = inputImage.get();
    pixelatedImg.loadPixels();

    for (let y = 0; y < pixelatedImg.height; y += pixelSize) {
        for (let x = 0; x < pixelatedImg.width; x += pixelSize) {
            let totalRed = 0, totalGreen = 0, totalBlue = 0;

            // Accumulate RGB values for each pixel in the block
            for (let i = 0; i < pixelSize; i++) {
                for (let j = 0; j < pixelSize; j++) {
                    let idx = ((y + j) * pixelatedImg.width + (x + i)) * 4;
                    totalRed += pixelatedImg.pixels[idx];
                    totalGreen += pixelatedImg.pixels[idx + 1];
                    totalBlue += pixelatedImg.pixels[idx + 2];
                }
            }

            // Calculate average RGB values
            let avgRed = totalRed / (pixelSize * pixelSize);
            let avgGreen = totalGreen / (pixelSize * pixelSize);
            let avgBlue = totalBlue / (pixelSize * pixelSize);

            // Apply the average color to each pixel in the block
            for (let i = 0; i < pixelSize; i++) {
                for (let j = 0; j < pixelSize; j++) {
                    let idx = ((y + j) * pixelatedImg.width + (x + i)) * 4;
                    pixelatedImg.pixels[idx] = avgRed;
                    pixelatedImg.pixels[idx + 1] = avgGreen;
                    pixelatedImg.pixels[idx + 2] = avgBlue;
                }
            }
        }
    }

    pixelatedImg.updatePixels();
    return pixelatedImg;
}
