# GK Lit Web Components

A collection of reusable web components built with Lit for Nuxt.js applications.

## Installation

```bash
npm install gk-lit-web-components
```

## Usage

Import and use the components in your Nuxt.js application:

```javascript
import { BannerSlider, MotionCarousel } from "gk-lit-web-components";

// Register the components
customElements.define("banner-slider", BannerSlider);
customElements.define("motion-carousel", MotionCarousel);
```

Then use them in your templates:

```html
<banner-slider></banner-slider> <motion-carousel></motion-carousel>
```

## Components

### Banner Slider

A customizable banner slider component with smooth transitions.

### Motion Carousel

A motion-based carousel component with advanced animations.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT © Pratyaksh
