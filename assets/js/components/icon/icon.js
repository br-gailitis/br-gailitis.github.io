import {LitElement, html, css, svg} from 'lit';
import { globe } from './globe.js';

const shape = {
  globe
}

export class Icon extends LitElement {

  static styles = [
    css`
      :host {
        position: relative;
        --stroke-color: currentColor;
        --stroke-width: 7;
      }

      svg {
        position: absolute;
        top: 0;
        left: 0;
      }
    `
  ]

  static get properties() {
    return {
      name: { type: String }
    }
  }

  constructor() {
    super();
    this.name = 'globe';
  }

  render() {
    return html`
      <svg
        width="100%"
        height="100%"
        version="1.1"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="var(--stroke-color)"
        stroke-width="var(--stroke-width)"
      >
        ${shape[this.name]}
      </svg>
    `;
  }
}