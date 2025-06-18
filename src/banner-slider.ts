import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
// import { animate } from "@lit-labs/motion";
// import { styleMap } from "lit/directives/style-map.js";

interface Slider {
  bannerImageUrl: string;
  mobileBannerImageUrl: string;
  id: number;
  targetUrl?: string;
  title?: string;
  showWaterMark?: boolean;
  alt?: string;
}

@customElement("banner-slider")
export class BannerSlider extends LitElement {
  static styles = css`
    :host {
      display: block;
      --slider-width: 560px;
      --slider-height: 560px;
      --mobile-slider-width: 360px;
      --mobile-slider-height: 360px;
    }

    .slider-container {
      position: relative;
      width: 100%;
      max-width: var(--slider-width);
      margin: 0 auto;
    }

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      overflow: hidden;
      border-radius: 12px;
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .slide.active {
      opacity: 1;
    }

    .slide-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .pagination {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 8px;
      z-index: 10;
    }

    .pagination-bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--md-sys-color-on-background);
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }

    .pagination-bullet.active {
      opacity: 1;
    }

    .watermark {
      position: absolute;
      top: 58px;
      right: 44px;
      width: 80px;
      height: 80px;
      z-index: 10;
    }

    @media (max-width: 767px) {
      .slider-container {
        max-width: var(--mobile-slider-width);
      }

      .watermark {
        top: 64px;
        right: 25px;
      }
    }
  `;

  @property({ type: Array }) sliders: Slider[] = [];
  @property({ type: Boolean }) showTrustMarkers = false;
  @property({ type: Boolean }) isMarketing = false;

  @state() private currentIndex = 0;
  @state() private autoplayInterval: number | null = null;
  @state() private isHydrated = false;

  connectedCallback() {
    super.connectedCallback();
    this.isHydrated = true;
    this.startAutoplay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
  }

  private startAutoplay() {
    if (!this.isHydrated) return;
    this.stopAutoplay();
    this.autoplayInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  private nextSlide() {
    if (!this.isHydrated) return;
    this.currentIndex = (this.currentIndex + 1) % this.sliders.length;
    this.dispatchEvent(
      new CustomEvent("slideChange", {
        detail: {
          index: this.currentIndex,
          slide: this.sliders[this.currentIndex],
        },
      })
    );
  }

  private handleSlideClick(index: number) {
    if (!this.isHydrated) return;
    this.currentIndex = index;
    this.startAutoplay();
    this.dispatchEvent(
      new CustomEvent("slideClick", {
        detail: {
          index,
          slide: this.sliders[index],
        },
      })
    );
  }

  private handleImageClick(_event: Event, slide: Slider) {
    if (!this.isHydrated) return;
    if (slide.targetUrl) {
      this.dispatchEvent(
        new CustomEvent("slideLinkClick", {
          detail: {
            url: slide.targetUrl,
            slide,
          },
        })
      );
    }
  }

  render() {
    // During SSR, render only the first slide
    const slidesToRender = this.isHydrated
      ? this.sliders
      : this.sliders.slice(0, 1);

    return html`
      <div class="slider-container">
        <div class="slider-wrapper">
          ${slidesToRender.map(
            (slide, index) => html`
              <div
                class="slide ${index === this.currentIndex ? "active" : ""}"
                @click=${(e: Event) => this.handleImageClick(e, slide)}
              >
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcset=${slide.mobileBannerImageUrl}
                  />
                  <img
                    class="slide-image"
                    src=${slide.bannerImageUrl}
                    alt=${slide.alt || slide.title || ""}
                    loading=${index === 0 ? "eager" : "lazy"}
                    fetchpriority=${index === 0 ? "high" : "low"}
                  />
                </picture>
                ${slide.showWaterMark
                  ? html`
                      <img
                        class="watermark"
                        src="/images/water-mark-color.webp"
                        alt="watermark"
                        width="80"
                        height="80"
                        loading="eager"
                      />
                    `
                  : ""}
              </div>
            `
          )}
        </div>
        ${this.isHydrated && this.sliders.length > 1
          ? html`
              <div class="pagination">
                ${this.sliders.map(
                  (_, index) => html`
                    <div
                      class="pagination-bullet ${index === this.currentIndex
                        ? "active"
                        : ""}"
                      @click=${() => this.handleSlideClick(index)}
                    ></div>
                  `
                )}
              </div>
            `
          : ""}
      </div>
    `;
  }
}
