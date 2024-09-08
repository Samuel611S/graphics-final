/*
  Project Overview:
  -----------------
  This project involves the implementation of real-time video capture and image processing techniques using JavaScript and the p5.js library. The primary goal is to allow users to capture a video feed, apply various filters, and perform thresholding operations in different color spaces. The project offers a wide range of filters and manipulations that allow for creative and functional image editing.

  Core Features:
  --------------
  1. **Video Capture:**
     The system captures real-time video from the user's device and displays it on a canvas. The video feed can be frozen (paused) at any point, allowing the user to apply image processing techniques to the captured frame.

  2. **Thresholding Sliders:**
     The project provides control over thresholding for individual RGB channels through three sliders: red, green, and blue. Users can adjust these sliders to control how colors are thresholded, allowing for precise color manipulation.

  3. **Color Space Conversions:**
     Two significant color space conversions are included:
      - **TCbCr Conversion:** Converts the image into the YCbCr color space for enhanced thresholding.
      - **HSV Conversion:** Converts the image into the HSV color space, which is useful for operations involving hue, saturation, and brightness.

  4. **Image Processing Filters:**
     Various image filters are implemented, allowing the user to apply effects such as grayscale conversion, pixelation, sepia, inversion, Gaussian blur, and edge detection (emboss). These filters are used to manipulate the captured frame in real-time, giving users creative control over their images.

  5. **Image Grid and Captions:**
     Processed images are displayed in a grid format. Each grid image is captioned to describe the filter or operation applied. These captions allow users to easily understand the type of manipulation performed on each image.

  6. **Enhanced Pixelation and Vignette:**
     Special filters such as enhanced pixelation and vignette are available to improve the aesthetics of images. These filters add a layer of artistic control to the captured frames.

  Technical Summary:
  ------------------
  The project primarily makes use of the p5.js library for video and image manipulation. Image data is accessed through pixel arrays, allowing for direct modification of each pixel’s color channels. Several functions process the image by looping through its pixels and performing calculations for various effects, including:
    - Grayscale conversion via luminance calculations.
    - Pixelation by averaging blocks of pixels.
    - Channel separation into Red, Green, and Blue channels.

  The thresholding functions give users control over color intensity through sliders. Users can set specific thresholds for the red, green, and blue channels, altering the appearance of their images in a controlled and interactive way. 

  Special effects like sepia, vignette, and pixelation filters provide enhanced aesthetic features. These filters are implemented by manipulating pixel data, adjusting brightness, contrast, or color, and applying advanced visual techniques.

  Conclusion:
  -----------
  This project demonstrates a wide variety of image processing and manipulation techniques, providing users with the ability to capture, edit, and enhance video frames in real time. With a combination of color space conversions, thresholding, and aesthetic filters, this tool can be further extended to include more creative and functional image editing capabilities.
*/