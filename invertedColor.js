function invertColors(img) {
    let invertedImage = createImage(img.width, img.height);
    img.loadPixels();
    invertedImage.loadPixels();
    for (let i = 0; i < img.pixels.length; i += 4) {
        invertedImage.pixels[i] = 255 - img.pixels[i];     // Red
        invertedImage.pixels[i + 1] = 255 - img.pixels[i + 1]; // Green
        invertedImage.pixels[i + 2] = 255 - img.pixels[i + 2]; // Blue
        invertedImage.pixels[i + 3] = img.pixels[i + 3];   // Alpha
    }
    invertedImage.updatePixels();
    return invertedImage;
}
