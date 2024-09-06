function convertToTCbCr(inputImage) {
    let tcbrImage = createImage(inputImage.width, inputImage.height);
    tcbrImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, tcbrImage.width, tcbrImage.height);
  
    tcbrImage.loadPixels();

    for (let i = 0; i < tcbrImage.pixels.length; i += 4) {
        let red = tcbrImage.pixels[i];
        let green = tcbrImage.pixels[i + 1];
        let blue = tcbrImage.pixels[i + 2];

        // Transform RGB to YCbCr color components
        let Y = (0.299 * red) + (0.587 * green) + (0.114 * blue);
        let Cb = (-0.1687 * red) - (0.3313 * green) + (0.5 * blue) + 128;
        let Cr = (0.5 * red) - (0.4187 * green) - (0.0813 * blue) + 128;

        // Set the YCbCr values to pixels
        tcbrImage.pixels[i] = Y;
        tcbrImage.pixels[i + 1] = Cb;
        tcbrImage.pixels[i + 2] = Cr;
    }
    
    tcbrImage.updatePixels();
    return tcbrImage;
}
  
function convertToHSV(inputImage) {
    let hsvImage = createImage(inputImage.width, inputImage.height);
    hsvImage.copy(inputImage, 0, 0, inputImage.width, inputImage.height, 0, 0, hsvImage.width, hsvImage.height);
  
    hsvImage.loadPixels();
    
    for (let i = 0; i < hsvImage.pixels.length; i += 4) {
        let red = hsvImage.pixels[i] / 255;
        let green = hsvImage.pixels[i + 1] / 255;
        let blue = hsvImage.pixels[i + 2] / 255;
  
        let maxVal = Math.max(red, green, blue);
        let minVal = Math.min(red, green, blue);
        let diff = maxVal - minVal;

        let hue = 0;
        let saturation = maxVal === 0 ? 0 : (diff / maxVal) * 100;
        let value = maxVal * 100;

        if (diff !== 0) {
            if (maxVal === red) {
                hue = ((green - blue) / diff) % 6;
            } else if (maxVal === green) {
                hue = (blue - red) / diff + 2;
            } else {
                hue = (red - green) / diff + 4;
            }
        }
  
        // Adjust hue to be in degrees
        hue = Math.round(hue * 60);
        if (hue < 0) hue += 360;
        
        // Set the HSV values to pixels
        hsvImage.pixels[i] = hue;
        hsvImage.pixels[i + 1] = saturation;
        hsvImage.pixels[i + 2] = value;
    }
    
    hsvImage.updatePixels();
    return hsvImage;
}