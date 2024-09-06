function applyHeavyPixelationFilter(inputImage, pixelSize = 20) {
    let outputImage = createImage(inputImage.width, inputImage.height);
    outputImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, outputImage.width, outputImage.height);

    outputImage.loadPixels(); // Load pixel data from inputImage
    let tempPixels = []; // Temporary array for storing pixel data

    // Create a temporary image to hold the pixelated version
    let tempImage = createImage(Math.ceil(inputImage.width / pixelSize), Math.ceil(inputImage.height / pixelSize));
    tempImage.loadPixels();

    // Process each block of pixels
    for (let y = 0; y < tempImage.height; y++) {
        for (let x = 0; x < tempImage.width; x++) {
            // Calculate average color for the pixel block
            let r = 0, g = 0, b = 0;
            let count = 0;
            
            for (let dy = 0; dy < pixelSize; dy++) {
                for (let dx = 0; dx < pixelSize; dx++) {
                    let srcX = x * pixelSize + dx;
                    let srcY = y * pixelSize + dy;

                    if (srcX < inputImage.width && srcY < inputImage.height) {
                        let index = (srcX + srcY * inputImage.width) * 4;
                        r += inputImage.pixels[index];
                        g += inputImage.pixels[index + 1];
                        b += inputImage.pixels[index + 2];
                        count++;
                    }
                }
            }
            
            // Average the color
            r = r / count;
            g = g / count;
            b = b / count;

            let tempIndex = (x + y * tempImage.width) * 4;
            tempImage.pixels[tempIndex] = r;
            tempImage.pixels[tempIndex + 1] = g;
            tempImage.pixels[tempIndex + 2] = b;
            tempImage.pixels[tempIndex + 3] = 255; // Alpha
        }
    }
    
    tempImage.updatePixels();

    // Scale the temporary image back to the original size
    outputImage.copy(tempImage, 0, 0, tempImage.width, tempImage.height, 0, 0, outputImage.width, outputImage.height);

    return outputImage;
}
