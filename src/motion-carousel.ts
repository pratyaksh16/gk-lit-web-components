import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { animate } from "@lit-labs/motion";
import { styleMap } from "lit/directives/style-map.js";
import { styles } from "./styles.js";

@customElement("motion-carousel")
export class MotionCarousel extends LitElement {
  static styles = styles;
  @property({ type: Number }) selected = 0;

  data = Array(7).fill(null, 0);
  @state() private isHydrated = false;

  connectedCallback() {
    super.connectedCallback();
    this.isHydrated = true;
  }

  render() {
    // During SSR, render only the first card
    const cardsToRender = this.isHydrated ? this.data : this.data.slice(0, 1);

    return html`
      <section class="container">
        ${cardsToRender.map((_v, i) => {
          const count = this.data.length;
          const center = Math.trunc(count / 2);
          const order = (count + center + i - this.selected) % count;
          const zIndex = order === 0 || order === count - 1 ? -1 : 1;
          const fraction = i / this.data.length;
          return html`<div
            @click=${this.isHydrated
              ? order < center
                ? this.dec
                : this.inc
              : undefined}
            style=${styleMap({
              order: String(order),
              zIndex: String(zIndex),
              background: `hsl(
                    ${Math.trunc(360 * fraction)},
                    ${20 + Math.trunc(60 * fraction)}%,
                    ${30 + Math.trunc(30 * fraction)}%)`,
            })}
            class="card"
            ${this.isHydrated ? animate() : ""}
          >
            ${i}
          </div>`;
        })}
      </section>
    `;
  }

  shift(i: number) {
    if (!this.isHydrated) return i;
    const last = this.data.length - 1;
    return i > last ? 0 : i < 0 ? last : i;
  }

  dec() {
    if (!this.isHydrated) return;
    this.selected = this.shift(this.selected - 1);
  }

  inc() {
    if (!this.isHydrated) return;
    this.selected = this.shift(this.selected + 1);
  }
}
