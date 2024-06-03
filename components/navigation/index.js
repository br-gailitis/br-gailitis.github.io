import {LitElement, html, css, createRef, ref} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

export class Navigation extends LitElement {

  #menuRef = createRef();

  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: 3rem auto min-content;
        align-items: center;
        gap: 1rem;
        height: 100%;
      }

      ::slotted([slot=logo]) {
        max-height: 100%;
        width: 100%;
      }

      ::slotted([slot=menu]) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: 2rem;
      }

      dialog {
        box-sizing: border-box;
        margin: 0;
        border: 0;
        left: calc(100% - 500px);
        width: 500px;
        height: 100%;
        max-height: 100vh;
      }

      #closeButton {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font: var(--font-base);
        background: none;
        border: 0;
        display:flex;
        align-items: center;
        font-size: 1rem;
      }

      #closeButton::before, #closeButton::after {
        content: '';
        position: absolute;
      }
    `
  ]

  openMenu() {
    this.#menuRef.value.showModal()
  }

  closeMenu() {
    this.#menuRef.value.close();
  }

  handleDialogClick(event) {
    if (event.target === this.#menuRef.value) this.closeMenu();
  }

  render() {
    return html`
        <slot name="logo"></slot>
        <slot name="title"></slot>
        <slot name="trigger" @click="${this.openMenu}"></slot>
        <dialog @click="${this.closeMenu}" ${ref(this.#menuRef)}>
          <form method="dialog">
            <slot name="menu"></slot>
            <input type="submit" id="closeButton" value="Close">
          </form>
        </dialog>
    `;
  }
}