import {LitElement, html, css} from 'lit';

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
        border-radius: 5rem;
        width: 100%;
      }
      
      ::slotted([slot=title]) {
        line-height: 1;
        font-size: 4rem;
      }

      ::slotted([slot=subtitle]) {
        font-size: 1.5rem;
        line-height: 1.25;
        font-weight: var(--font-weight-regular);
      }

      ::slotted([slot=description]) {
        grid-area: body;
        font-size: 1rem;
      }

      @media (max-width:1000px)  {
        :host {
          grid-template-areas: 'attachment' 'content';
          gap: 2rem;
        }

        ::slotted([slot=title]) {
          font-size: 3rem;
        }

        ::slotted([slot=attachment]) {
          grid-area: attachment;
          border-radius: 40px;
          max-width: 150px;
          max-height: 150px;
          object-fit: cover;
        }
      }
    `
  ]

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