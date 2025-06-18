# GK Lit Web Components

A collection of reusable web components built with Lit.

## Components

### Banner Slider

A responsive banner slider component with support for desktop and mobile images.

```html
<banner-slider
  .sliders=${[
    {
      bannerImageUrl: "path/to/image.jpg",
      mobileBannerImageUrl: "path/to/mobile-image.jpg",
      id: 1,
      title: "My Banner"
    }
  ]}
></banner-slider>
```

#### Properties

- `sliders`: Array of slider objects with properties:
  - `bannerImageUrl`: URL for desktop image
  - `mobileBannerImageUrl`: URL for mobile image
  - `id`: Unique identifier
  - `targetUrl`: Optional link URL
  - `title`: Optional title
  - `showWaterMark`: Optional boolean for watermark
  - `alt`: Optional alt text
- `showTrustMarkers`: Boolean
- `isMarketing`: Boolean

### Motion Carousel

An animated carousel component with smooth transitions.

```html
<motion-carousel selected="2"></motion-carousel>
```

#### Properties

- `selected`: Number (defaults to 0)

## Installation

```bash
npm install gk-lit-web-components
```

## Usage

```javascript
// Import the components
import 'gk-lit-web-components';

// Use in your HTML
<banner-slider></banner-slider>
<motion-carousel></motion-carousel>
```

## License

MIT
