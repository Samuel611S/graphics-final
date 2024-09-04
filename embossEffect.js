function applyEmbossEffect(inputImage) {
    // Clone the inputImage to avoid modifying the original image
    let embossImage = inputImage.get();
    embossImage.loadPixels();
    let pixels = embossImage.pixels;

    // Define the emboss kernel matrix
    let kernel = [
        [-2, -1, 0],
        [-1, 1, 1],
        [0, 1, 2]
    ];

    // Apply convolution matrix to each pixel
    for (let y = 1; y < embossImage.height - 1; y++) {
        for (let x = 1; x < embossImage.width - 1; x++) {
            let index = (x + y * embossImage.width) * 4;

            let r = 0, g = 0, b = 0;

            // Apply kernel to the surrounding pixels
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    let imgX = x + kx;
                    let imgY = y + ky;
                    let imgIndex = (imgX + imgY * embossImage.width) * 4;

                    let weight = kernel[ky + 1][kx + 1];

                    r += pixels[imgIndex] * weight;
                    g += pixels[imgIndex + 1] * weight;
                    b += pixels[imgIndex + 2] * weight;
                }
            }

            // Set the new pixel values
            embossImage.pixels[index] = constrain(r + 128, 0, 255);
            embossImage.pixels[index + 1] = constrain(g + 128, 0, 255);
            embossImage.pixels[index + 2] = constrain(b + 128, 0, 255);
        }
    }

    embossImage.updatePixels();
    return embossImage;
}