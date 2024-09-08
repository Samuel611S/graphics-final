// Declaring global variables
let videoStream;
let canvasArray = [];
// Capture buttons
let unFreeze;
let capturing = false;
let frozenImage;
// Sliders to control thresholding
let redThresholdSlider, greenThresholdSlider, blueThresholdSlider;
let tcbrThresholdSlider;
let hsvThresholdSlider;
// Face detection
let detectionCanvas;
let detectedFaces = [];

//Others
let pixelBlockSize = 5;
let currentFaceIndex = 0;

// Image imageCaptions for grid
let imageCaptions = [
    ["Original", "Grayscale", "Pixelated", "Red Channel", "Green Channel", "Blue Channel", "Red Thresholded", "Green Thresholded", "Blue Thresholded", "B&W Thresholded", "TCbCr", "HSV", "Threshold TCbCr", "Threshold HSV","Sepia","Inverted","Emboss","Gaussian Blur","Aesthetic","Hacked","Vignette","Enhanced Pixelation","Halftone","Color Shifting","TimeWarp"]
];

function setup() {
    createCanvas(160 * 4, 140 * 7);
    
    //Creating the videoStream and setting the size for each grid 
    videoStream = createCapture(VIDEO, function () {
        videoStream.size(160, 120);
        for (let i = 0; i < 4 * 5; i++) {
            canvasArray.push(createGraphics(160, 120));
        }
         // Initialize sliders
        pixelationSlider = select('#pixelationSlider');
        halftoneSlider = select('#halftoneSlider');
        colorShiftSlider = select('#colorShiftSlider');
        timeWarpSlider = select('#timeWarpSlider');
        
        
        
        // Save Image button
         let saveImageButton = select('#saveImageButton');
         saveImageButton.mousePressed(saveImage);

        // Capture button
        let captureButton = select('#captureButton');
        captureButton.mousePressed(captureAndApplyFilters);

        // Uncapture Button
        let unFreeze = select('#unFreeze');
        unFreeze.mousePressed(uncaptureAndUnfreeze);

    // Create a container for top sliders
    let topSliderContainer = select('#topSliderContainer');
    topSliderContainer.class('slider-container');
    // Slider intensity
    redThresholdSlider = createSlider(0, 180, 90);
    greenThresholdSlider = createSlider(0, 180, 90);
    blueThresholdSlider = createSlider(0, 180, 90);

    topSliderContainer.child(redThresholdSlider);
    topSliderContainer.child(greenThresholdSlider);
    topSliderContainer.child(blueThresholdSlider);

    // Create a container for bottom sliders
    let bottomSliderContainer = select('#bottomSliderContainer');
    bottomSliderContainer.class('slider-container');
    // Slider intensity
    tcbrThresholdSlider = createSlider(0, 255, 90);
    hsvThresholdSlider = createSlider(0, 255, 90);

    bottomSliderContainer.child(tcbrThresholdSlider);
    bottomSliderContainer.child(hsvThresholdSlider);

    detectionCanvas = createGraphics(160, 120);
        const faceOptions = {
            withLandmarks: true,
            withExpressions: true,
            withDescriptors: true,
            minConfidence: 0.5
          };

        //Hide the videoStream
        videoStream.hide();

    });


    // Activate capture button with "C" key press
    window.addEventListener('keydown', function (e) {
        if (e.key === 'c' || e.key === 'C') {
            captureAndApplyFilters();
        }
    });

    // Activate uncapture button with "V" key press
    window.addEventListener('keydown', function (e) {
        if (e.key === 'v' || e.key === 'V') {
            uncaptureAndUnfreeze();
        }
    });

    // Activate save image button with "V" key press
    window.addEventListener('keydown', function (e) {
        if (e.key === 's' || e.key === 'S') {
            saveImage();
        }
    });    
}
draw();

function draw() {
    background(255);
    if (videoStream.loadedmetadata) {
        let scaledImage = createImage(160, 120);
        scaledImage.copy(videoStream, 0, 0, videoStream.width, videoStream.height, 0, 0, scaledImage.width, scaledImage.height);

      
        displayImage(scaledImage, 0, 0, imageCaptions[0][0]);  // Original
        displayImage(grayscaleConversion(scaledImage), 1, 0, imageCaptions[0][1]);  // Grayscale
        
        displayImage(separateRGBChannels(scaledImage)[0], 0, 1, imageCaptions[0][3]);  // Red Channel
        
       
        displayImage(separateRGBChannels(scaledImage)[1], 1, 1, imageCaptions[0][4]);  // Green Channel
        displayImage(separateRGBChannels(scaledImage)[2], 2, 1, imageCaptions[0][5]);  // Blue Channel
        displayImage(applyColorChannelThreshold(separateRGBChannels(scaledImage)[0], redThresholdSlider.value()), 0, 2, imageCaptions[0][6]);  // Red Thresholded
        displayImage(applyColorChannelThreshold(separateRGBChannels(scaledImage)[1], greenThresholdSlider.value()), 1, 2, imageCaptions[0][7]);  // Green Thresholded
        
     
        displayImage(applyColorChannelThreshold(separateRGBChannels(scaledImage)[2], blueThresholdSlider.value()), 2, 2, imageCaptions[0][8]);  // Blue Thresholded
        displayImage(applyBWThreshold(scaledImage, 128), 3, 2, imageCaptions[0][9]);  // B&W Thresholded
        displayImage(convertToTCbCr(scaledImage), 0, 3, imageCaptions[0][10]);  // TCbCr Image
        displayImage(convertToHSV(scaledImage), 1, 3, imageCaptions[0][11]);  // HSV Image
        
     
        displayImage(applyTCbCrThreshold(scaledImage, tcbrThresholdSlider.value()), 2, 3, imageCaptions[0][12]);  // TCbCr Thresholded
        displayImage(applyHSVThreshold(scaledImage, hsvThresholdSlider.value()), 3, 3, imageCaptions[0][13]);  // HSV Thresholded
        
        displayImage(applyTimeWarpFilter(scaledImage, timeWarpSlider), 0, 4, imageCaptions[0][24]);  // Time Warp     
        displayImage(pixelateImage(scaledImage, pixelBlockSize), 1, 4, imageCaptions[0][2]);  // Pixelated
        displayImage(applySepia(scaledImage), 2, 4, imageCaptions[0][14]);  // Sepia Image
        displayImage(invertColors(scaledImage), 3, 4, imageCaptions[0][15]); // Inverted Colors

      
        displayImage(applyEmbossEffect(scaledImage), 0, 5, imageCaptions[0][16]); // Emboss Effect
        displayImage(applyGaussianBlur(scaledImage), 1, 5, imageCaptions[0][17]); //Gaussian Blur
        displayImage(applyAestheticFilter(scaledImage),2,5,imageCaptions[0][18]); //Aesthetic
        displayImage(applyGlitchFilter(scaledImage), 3, 5, imageCaptions[0][19]); //Hacked
       
        displayImage(applyVignetteFilter(scaledImage), 0, 6, imageCaptions[0][20]); //Vignette
        displayImage(applyHeavyPixelationFilter(scaledImage, pixelationSlider.value()), 1, 6, imageCaptions[0][21]);  //Heavy Pixelation
        displayImage(applyColorHalftoneFilter(scaledImage, halftoneSlider.value()), 2, 6, imageCaptions[0][22]); // Color Halftone
        displayImage(applyColorShiftingFilter(scaledImage, colorShiftSlider.value()), 3, 6, imageCaptions[0][23]); //Color Shifting
    }
}




function displayImage(img, col, row, caption) {
    let index = row * 2 + col;

    // Clear the canvas before drawing the new image
    canvasArray[index].clear();

    let x = col * 0;
    let y = row * 0;
    // Draw the image on the canvas
    canvasArray[index].image(img, 0, 0, 158, 118); // Leave 1-pixel border

    // Draw the caption array
    let captionX = x + 160 / 2; 
    let captionY = y + 120 - 5; 
    canvasArray[index].textAlign(CENTER);
    canvasArray[index].textSize(10);
    canvasArray[index].fill(255);
    canvasArray[index].text(caption, captionX, captionY);

    // Draw the canvas on the main canvas
    image(canvasArray[index], col * 160, row * 140);
}



function captureAndApplyFilters() {
    if (!capturing) {
        // Pause the videoStream to capture the current frame
        videoStream.pause();

        // Loop through all the grids
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) {
                if (col !== 2) {
                    let frozenImage = canvasArray[row * 3 + col].get();
                }
            }
        }

        // Set capturing to true
        capturing = true;
    } else {
        // Resume the videoStream after resetting frames
        videoStream.play();
        for (let i = 0; i < canvasArray.length; i++) {
            if (canvasArray[i]) {
                canvasArray[i].clear();
            }
        }

        // Set capturing to false
        capturing = false;
    }
}

function uncaptureAndUnfreeze() {
    // Resume the videoStream after resetting frames
    videoStream.play();

    // Clear the canvasArray
    for (let i = 0; i < canvasArray.length; i++) {
        if (canvasArray[i]) {
            canvasArray[i].clear();
        }
    }

    // Set capturing to false
    capturing = false;

    // Unfreeze the videoStream
    unfreeze();
}


function unfreeze() {
    videoStream.loop(); 
}

function saveImage() {
    // Call videoStream pause to get the frame
    videoStream.pause();

    // Create a graphics object to hold the entire grid
    let fullGridImage = createGraphics(width, height);

// Loop through all the grids to capture all the grid
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 4; col++) {
        let frozenImage = canvasArray[row * 2 + col].get();
        fullGridImage.image(frozenImage, col * 160, row * 140);
    }
}
    // Save the full grid image as a file
    fullGridImage.save("full_grid_image.png");
    videoStream.play();
}
