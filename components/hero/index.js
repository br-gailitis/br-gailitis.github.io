import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class HeroSection extends LitElement {

  static styles = [
    css`
      :host {
        line-height: 1.66;
        max-width: 1400px;
        margin: 0 auto;
        display: grid;
        gap: 5rem;
        grid-template-areas: 'content attachment';
      }

      header {
        grid-area: content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
      }

      ::slotted([slot=attachment]) {
        grid-area: attachment;
        border-radius: 5rem
      }

      ::slotted([slot=title]) {
        line-height: 1;
        font-size: 4rem;
      }

      ::slotted([slot=subtitle]) {
        font-size: 1.5rem;
        font-weight: var(--font-weight-regular);
      }

      ::slotted([slot=description]) {
        grid-area: body;
        font-size: 1rem;
      }
    `
  ]

  static properties = {}

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
        <slot name="description"></slot>
      </header>
      <slot name="attachment"></slot>
    `;
  }
}