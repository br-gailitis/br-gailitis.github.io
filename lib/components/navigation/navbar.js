import {LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { MediaQueryController } from '../../controllers/media-query.js';

export class NavigationBar extends LitElement {

  #menuRef = createRef();

  #mqSmall = new MediaQueryController(this, "(max-width: 1000px)");

  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: max-content auto;
        align-items: center;
        gap: 1rem;
        height: 100%;
        --nav-menu-width: 500px;
      }

      #brand {
        display: inline-flex;
        align-items: center;
        height: 100%;
        overflow:hidden;
        gap: var(--gap-3);
        text-decoration: none;
      }

      #brand-logo {
        object-fit: contain;
        max-height: 100%;
      }

      ::slotted([slot=title]) {
        color: var(--color-fg);
        font-weight: var(--font-weight-bold);
        font-size: 1.5rem;
      }

      #items {
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

      bg-button-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
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

  static get properties() {
    return {
      logo: { type: String },
      home: { type: String }
    }
  }

  constructor() {
    super();
    this.logo = "/assets/bg-logo.svg";
    this.home = "/";
  }

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

    const menu = html`
      <slot name="trigger" @click="${this.openMenu}"></slot>
      <dialog @click="${this.closeMenu}" ${ref(this.#menuRef)}>
        <slot name="menu"></slot>
        <bg-button-close @click="${this.closeMenu}">Close</bg-button-close>
      </dialog>
    `;

    return html`
        <a id="brand" href="${this.home}">
          <img id="brand-logo" src="${this.logo}"/>
          <slot name="title"></slot>
        </a>
        <div id="items">
          ${ this.#mqSmall.matches ? menu : html`<slot name="menu"></slot>`}
        </div>
        
    `;
  }
}