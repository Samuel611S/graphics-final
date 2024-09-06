function applyColorHalftoneFilter(inputImage, dotSize) {
    let outputImage = createImage(inputImage.width, inputImage.height);
    outputImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, outputImage.width, outputImage.height);
    outputImage.loadPixels();
    inputImage.loadPixels();

    for (let y = 0; y < outputImage.height; y += dotSize) {
        for (let x = 0; x < outputImage.width; x += dotSize) {
            let c = inputImage.get(x, y);
            let r = red(c);
            let g = green(c);
            let b = blue(c);

            // Draw a filled circle with color at the original position
            for (let dy = 0; dy < dotSize; dy++) {
                for (let dx = 0; dx < dotSize; dx++) {
                    let px = x + dx;
                    let py = y + dy;
                    if (px < outputImage.width && py < outputImage.height) {
                        let d = dist(px, py, x + dotSize / 2, y + dotSize / 2);
                        if (d < dotSize / 2) {
                            let index = (px + py * outputImage.width) * 4;
                            outputImage.pixels[index] = r;       // Red
                            outputImage.pixels[index + 1] = g;   // Green
                            outputImage.pixels[index + 2] = b;   // Blue
                        }
                    }
                }
            }
        }
    }

    outputImage.updatePixels();
    return outputImage;
}
