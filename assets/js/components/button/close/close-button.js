import {LitElement, html, css} from 'lit';

export class CloseButton extends LitElement {

  static styles = [
    css`
      button {
        position: relative;
        background: rgba(0,0,0,0.1);
        border: 0;
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        text-indent: -200vw;
      }

      button::before, button::after {
        content: '';
        position: absolute;
        background-color: var(--color-fg);
        width: 2px;
        height: 1rem;
        left: calc(50% - 1px);
      }

      button::before {
        transform: rotate(-45deg);
      }

      button::after {
        transform: rotate(45deg);
      }

      button:hover {
        opacity: 0.8;
      }

    `,
  ]

  render() {
    return html`<button><slot></slot></button>`;
  }
}