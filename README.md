# Responsive Carousel Application

This project is a responsive image carousel built using React. It supports auto-responsiveness and is scalable, being able to display over a 1000 images. The application dynamically generates random images from Unsplash and offers a user-friendly interface to adjust the number of images, carousel width, and height.

## Features

- Responsive design that adapts to different screen sizes.
- Supports more than 1000 images.
- Auto-responsive mode to automatically adjust the carousel dimensions based on the viewport size.
- Customizable number of images, carousel width, and height.

## Components

### CarouselPage

This is the main page component that manages the state and user interactions for the carousel.

#### State Variables

- `numImages`: Number of images in the carousel.
- `carouselWidth`: Width of the carousel.
- `carouselHeight`: Height of the carousel.
- `images`: List of generated image URLs.
- `carouselKey`: Key to force re-render of the carousel.
- `isAutoResponsive`: Boolean to toggle auto-responsive mode.
- `isMobile`: Boolean to check if the viewport width is less than or equal to 720 pixels.

#### Methods

- `generateRandomImages(num)`: Generates a specified number of random images from Unsplash.
- `getInitialWidth()`: Returns the initial width based on the viewport size.
- `getInitialHeight()`: Returns the initial height based on the viewport size.
- `handleInputChange(e)`: Handles input changes for the number of images, width, and height.
- `handleCheckboxChange(e)`: Handles the change event for the auto-responsive checkbox.
- `handleResize()`: Updates `isMobile` state on window resize.

#### Effects

- `useEffect` to update `carouselKey` whenever properties affecting the carousel change.
- `useEffect` to handle window resize events.

### ImageList

This component renders the list of images using `react-virtualized`'s `Grid` and `AutoSizer` components for optimized rendering and scrolling performance.

#### Props

- `images`: List of image URLs.
- `width`: Width of each image.
- `height`: Height of each image.
- `isMobile`: Boolean to check if the viewport is mobile-sized.

#### State Variables

- `startX`: Starting X coordinate for touch events.
- `scrollLeft`: Current scroll position.

#### Methods

- `handleSnap()`: Handles snapping behavior to create an infinite scrolling effect.
- `handleScrollEnd()`: Delays snapping to allow smooth scrolling.
- `handleWheel(event)`: Handles mouse wheel events for horizontal scrolling.
- `handleTouchStart(event)`: Handles touch start events.
- `handleTouchMove(event)`: Handles touch move events.

#### Effects

- `useEffect` to set up and clean up event listeners for scrolling and touch events.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/denis010100/scalable-carousel.git
   cd scalable-carousel
   ```

2. Install dependencies:

   ```bash
   /p/npm i
   ```

3. Start the development server:
   ```bash
   /p/npm dev
   ```

## Usage

- Adjust the number of images by entering a value in the "Number of Images" input field.
- Set the carousel width and height using the respective input fields.
- Enable the auto-responsive mode by checking the "Auto-Responsive" checkbox.
- The carousel will adapt its dimensions and behavior based on the viewport size.

## Acknowledgements

- Images are fetched from [Unsplash](https://unsplash.com/).
- Scrolling and virtualization are handled by [react-virtualized](https://github.com/bvaughn/react-virtualized).

## Contact

For any questions or feedback, please contact [denis010100@gmail.com](mailto:denis010100@gmail.com).
