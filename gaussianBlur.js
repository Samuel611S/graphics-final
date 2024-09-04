function applyGaussianBlur(inputImage) {
    let blurImage = inputImage.get();
    blurImage.loadPixels();
    let pixels = blurImage.pixels;

    let kernel = [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16]
    ];

    for (let y = 1; y < blurImage.height - 1; y++) {
        for (let x = 1; x < blurImage.width - 1; x++) {
            let index = (x + y * blurImage.width) * 4;

            let r = 0, g = 0, b = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    let imgX = x + kx;
                    let imgY = y + ky;
                    let imgIndex = (imgX + imgY * blurImage.width) * 4;

                    let weight = kernel[ky + 1][kx + 1];

                    r += pixels[imgIndex] * weight;
                    g += pixels[imgIndex + 1] * weight;
                    b += pixels[imgIndex + 2] * weight;
                }
            }

            blurImage.pixels[index] = constrain(r, 0, 255);
            blurImage.pixels[index + 1] = constrain(g, 0, 255);
            blurImage.pixels[index + 2] = constrain(b, 0, 255);
        }
    }

    blurImage.updatePixels();
    return blurImage;
}