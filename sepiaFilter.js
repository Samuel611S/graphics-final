function applySepia(img) {
    let sepiaImage = createImage(img.width, img.height);
    sepiaImage.loadPixels();
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];

        sepiaImage.pixels[i] = r * 0.393 + g * 0.769 + b * 0.189;
        sepiaImage.pixels[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
        sepiaImage.pixels[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
        sepiaImage.pixels[i + 3] = img.pixels[i + 3]; // Alpha channel
    }

    sepiaImage.updatePixels();
    return sepiaImage;
}
