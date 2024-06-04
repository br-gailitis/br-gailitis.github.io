import {LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

export class Navigation extends LitElement {

  #menuRef = createRef();

  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: 3rem max-content auto;
        align-items: center;
        gap: 1rem;
        height: 100%;
        --nav-menu-width: 500px;
      }

      ::slotted([slot=title]) {
        text-decoration: none;
        color: var(--color-fg);
        font-weight: var(--font-weight-bold);
        font-size: 1.5rem
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

      ::slotted([slot=trigger]) {
        display: flex;
        justify-content: flex-end;
      }

      dialog {
        box-sizing: border-box;
        margin: 0;
        border: 0;
        left: calc(100% - var(--nav-menu-width));
        width: var(--nav-menu-width);
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

      @media (max-width:600px)  {
        dialog {
          left:0;
          width: 100%;
          max-width: 100%;
        }
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