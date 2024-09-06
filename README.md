# Video Capture and Image Processing Project

Welcome to the Video Capture and Image Processing Project! This application leverages **p5.js** to capture live video from your webcam and applies a variety of image processing filters to create interesting visual effects. It also includes real-time face detection and interactive controls for a dynamic user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Filters](#filters)
- [Customization](#customization)
- [Contribution](#contribution)
- [License](#license)

## Features

- **Live Video Capture:** Stream video from your webcam and view it in a grid of processed images.
- **Image Processing Filters:** Apply multiple filters including grayscale, sepia, pixelation, and more.
- **Face Detection:** Detect faces in the video and overlay images or effects on detected areas.
- **Interactive Controls:** Adjust filter parameters in real-time with sliders.
- **Snapshot Functionality:** Capture and save the processed grid of images.

## Technologies Used

- **p5.js:** A JavaScript library for creative coding used for video capture and image processing.
- **p5.dom.js:** For integration with HTML elements.
- **p5.sound.js:** For potential future audio processing.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Samuel611S/graphics-final.git
2. **Navigate to the project folder:**
   ```bash
   cd graphics-final
3. **Open Index.html in a browser**
## Usage

- **Capture:** Click the capture button to process the video and see the filters.
- **Adjust Filters:** Use the sliders to change filter settings.
- **Save Image:** Click the save button to capture and download the current grid.
## Filters

The application includes the following filters:

1. **Grayscale:** Converts the image to grayscale.
2. **Pixelate:** Pixelates the image with a customizable pixel size.
3. **Color Channels:** Displays separate red, green, and blue color channels.
4. **Thresholding:** Applies thresholding to color channels.
5. **Black & White Thresholding:** Applies a black-and-white threshold to the image.
6. **TCbCr Image:** Converts the image to the TCbCr color space.
7. **HSV Image:** Converts the image to the HSV color space.
8. **Sepia:** Applies a sepia tone to the image.
9. **Invert Colors:** Inverts the colors of the image.
10. **Emboss:** Adds an emboss effect to the image.
11. **Gaussian Blur:** Applies a Gaussian blur to the image.
12. **Face Overlay:** Overlays a custom image onto detected faces in the video feed.
13. **Aesthetic Filter:** Adds an aesthetic effect similar to Snapchat filters.
14. **Custom Filter:** Applies a user-defined custom filter.

## Adding Filters

To add a new filter:

1. **Create a New JavaScript File**: Add a new JavaScript file for your filter in the `filters` directory.
2. **Implement the Filter Function**: Define a function that takes an input image and applies the filter effect. Ensure the function is properly tested.
3. **Integrate with Main Code**: Import your filter function into the main JavaScript file (`main.js`) and add it to the filter list.
4. **Update Captions**: Update the `captions` array in the main code to include a description of the new filter.
