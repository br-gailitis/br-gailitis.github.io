import {LitElement, html, css } from 'lit';

export class NavigationBarMenu extends LitElement {

  static styles = [
    css`
      ::slotted(a) {
        font-weight: bold;
        text-decoration: none;
        color: var(--color-fg);
      }

      ::slotted(a:hover) {
        opacity: 0.8;
      }

      :host {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        font-size: 2rem;
      }

      @media (max-width: 1000px) {
        :host {
          padding-top: 3rem;
        }
      }

      @media (min-width: 1001px) {
        :host {
          flex-direction: row;
        }
      }
    `
  ]

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }

  render() {
    return html`<slot></slot>`;
  }
}