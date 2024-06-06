import {LitElement, html, css} from 'lit';

export class MenuButton extends LitElement {

  static styles = [
    css`
      :host {
        --menu-color: var(--color-fg);
      }

      button {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        display: inline-block;
        text-indent: -200vw;
        background: none;
        border: none;
        cursor: pointer;
      }

      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
        fill: var(--menu-color);
      }
    `,
  ]

  render() {

    const barHeight = 10;
    const offset = 15;
    const radius = 2;

    return html`
      <button>
        <slot>Menu</slot>
        <svg
          width="100%"
          height="100%"
          version="1.1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu icon</title>
          <rect width="100" height="${barHeight}" x="0" y="${offset}" rx="${radius}" ry="${radius}"></rect>
          <rect width="100" height="${barHeight}" x="0" y="${50 - barHeight / 2}" rx="${radius}" ry="${radius}"></rect>
          <rect width="100" height="${barHeight}" x="0" y="${100 - barHeight - offset}" rx="${radius}" ry="${radius}"></rect>
        </svg>
      </button>
    `;
  }
}