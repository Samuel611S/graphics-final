// Declaring global variables
let video;
let canvasList = [];
// Capture buttons
let unfreezeButton;
let isCapturing = false;
let capturedImage;
// Sliders to control thresholding
let redSlider, greenSlider, blueSlider;
let tcbrThresholdSlider;
let hsvThresholdSlider;
// Face detection
let faceCanvas;
let detections = [];
let faceapi;

//Others
let pixelSize = 5;
let faceReplacementIndex = 0;

// Image captions for grid
let captions = [
    ["Original Image", "Grayscale Image", "Pixelated Image", "Red Channel", "Green Channel", "Blue Channel", "Red Thresholded", "Green Thresholded", "Blue Thresholded", "B&W Thresholded", "TCbCr Image", "HSV Image", "Face Detection", "Threshold TCbCr", "Threshold HSV","Sepia Image","Inverted","Emboss","Gaussian Blur","Aesthetic","Hacked"]
];

function setup() {
    createCanvas(160 * 4, 140 * 5);

    //Creating the video and setting the size for each grid 
    video = createCapture(VIDEO, function () {
        video.size(160, 120);
        for (let i = 0; i < 4 * 5; i++) {
            canvasList.push(createGraphics(160, 120));
        }
        
        // Save Image button
         let saveImageButton = select('#saveImageButton');
         saveImageButton.mousePressed(saveImage);

        // Capture button
        let captureButton = select('#captureButton');
        captureButton.mousePressed(captureAndApplyFilters);

        // Uncapture Button
        let unfreezeButton = select('#unfreezeButton');
        unfreezeButton.mousePressed(uncaptureAndUnfreeze);

    // Create a container for top sliders
    let topSliderContainer = select('#topSliderContainer');
    topSliderContainer.class('slider-container');
    // Slider intensity
    redSlider = createSlider(0, 180, 90);
    greenSlider = createSlider(0, 180, 90);
    blueSlider = createSlider(0, 180, 90);

    topSliderContainer.child(redSlider);
    topSliderContainer.child(greenSlider);
    topSliderContainer.child(blueSlider);

    // Create a container for bottom sliders
    let bottomSliderContainer = select('#bottomSliderContainer');
    bottomSliderContainer.class('slider-container');
    // Slider intensity
    tcbrThresholdSlider = createSlider(0, 255, 90);
    hsvThresholdSlider = createSlider(0, 255, 90);

    bottomSliderContainer.child(tcbrThresholdSlider);
    bottomSliderContainer.child(hsvThresholdSlider);

    faceCanvas = createGraphics(160, 120);
        const faceOptions = {
            withLandmarks: true,
            withExpressions: true,
            withDescriptors: true,
            minConfidence: 0.5
          };

        //Hide the video
        video.hide();

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
    if (video.loadedmetadata) {
        let scaledImage = createImage(160, 120);
        scaledImage.copy(video, 0, 0, video.width, video.height, 0, 0, scaledImage.width, scaledImage.height);

        // Row 0
        displayImage(scaledImage, 0, 0, captions[0][0]);  // Original
        displayImage(convertToGrayscale(scaledImage), 1, 0, captions[0][1]);  // Grayscale
        displayImage(convertToPixelate(scaledImage, pixelSize), 2, 0, captions[0][2]);  // Pixelated
        displayImage(splitIntoChannels(scaledImage)[0], 3, 0, captions[0][3]);  // Red Channel
        
        // Row 1
        displayImage(splitIntoChannels(scaledImage)[1], 0, 1, captions[0][4]);  // Green Channel
        displayImage(splitIntoChannels(scaledImage)[2], 1, 1, captions[0][5]);  // Blue Channel
        displayImage(applyThreshold(splitIntoChannels(scaledImage)[0], redSlider.value()), 2, 1, captions[0][6]);  // Red Thresholded
        displayImage(applyThreshold(splitIntoChannels(scaledImage)[1], greenSlider.value()), 3, 1, captions[0][7]);  // Green Thresholded
        
        // Row 2
        displayImage(applyThreshold(splitIntoChannels(scaledImage)[2], blueSlider.value()), 0, 2, captions[0][8]);  // Blue Thresholded
        displayImage(blackAndWhiteThresholdImage(scaledImage, 128), 1, 2, captions[0][9]);  // B&W Thresholded
        displayImage(convertToTCbCr(scaledImage), 2, 2, captions[0][10]);  // TCbCr Image
        displayImage(convertToHSV(scaledImage), 3, 2, captions[0][11]);  // HSV Image
        
        // Row 3
        displayImage(tcbrImageThreshold(scaledImage, tcbrThresholdSlider.value()), 0, 3, captions[0][13]);  // TCbCr Thresholded
        displayImage(hsvImageThreshold(scaledImage, hsvThresholdSlider.value()), 1, 3, captions[0][14]);  // HSV Thresholded
        displayImage(applySepia(scaledImage), 2, 3, captions[0][15]);  // Sepia Image
        displayImage(invertColors(scaledImage), 3, 3, captions[0][16]); // Inverted Colors

        // Row 4
        displayImage(applyEmbossEffect(scaledImage), 0, 4, captions[0][17]); // Emboss Effect
        displayImage(applyGaussianBlur(scaledImage), 1, 4, captions[0][18]); //Gaussian Blur
        displayImage(applyAestheticFilter(scaledImage),2,4,captions[0][19]); //Aesthetic
        displayImage(applyGlitchFilter(scaledImage), 3, 4, captions[0][20]);
        
    }
}




function displayImage(img, col, row, caption) {
    let index = row * 3 + col;

    // Clear the canvas before drawing the new image
    canvasList[index].clear();

    let x = col * 0;
    let y = row * 0;
    // Draw the image on the canvas
    canvasList[index].image(img, 0, 0, 158, 118); // Leave 1-pixel border

    // Draw the caption array
    let captionX = x + 160 / 2; 
    let captionY = y + 120 - 5; 
    canvasList[index].textAlign(CENTER);
    canvasList[index].textSize(10);
    canvasList[index].fill(255);
    canvasList[index].text(caption, captionX, captionY);

    // Draw the canvas on the main canvas
    image(canvasList[index], col * 160, row * 140);
}



function captureAndApplyFilters() {
    if (!isCapturing) {
        // Pause the video to capture the current frame
        video.pause();

        // Loop through all the grids
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) {
                if (col !== 2) {
                    let capturedImage = canvasList[row * 3 + col].get();
                }
            }
        }

        // Set capturing to true
        isCapturing = true;
    } else {
        // Resume the video after resetting frames
        video.play();
        for (let i = 0; i < canvasList.length; i++) {
            if (canvasList[i]) {
                canvasList[i].clear();
            }
        }

        // Set capturing to false
        isCapturing = false;
    }
}

function uncaptureAndUnfreeze() {
    // Resume the video after resetting frames
    video.play();

    // Clear the canvasList
    for (let i = 0; i < canvasList.length; i++) {
        if (canvasList[i]) {
            canvasList[i].clear();
        }
    }

    // Set capturing to false
    isCapturing = false;

    // Unfreeze the video
    unfreeze();
}


function unfreeze() {
    video.loop(); 
}

function saveImage() {
    // Call video pause to get the frame
    video.pause();

    // Create a graphics object to hold the entire grid
    let fullGridImage = createGraphics(width, height);

// Loop through all the grids to capture all the grid
for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
        let capturedImage = canvasList[row * 3 + col].get();
        fullGridImage.image(capturedImage, col * 160, row * 140);
    }
}
    // Save the full grid image as a file
    fullGridImage.save("full_grid_image.png");
    video.play();
}
