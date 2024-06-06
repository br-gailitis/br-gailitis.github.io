import {LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { MediaQueryController } from '../../controllers/media-query.js';

export class NavigationBar extends LitElement {

  #menuRef = createRef();

  #mqSmall = new MediaQueryController(this, "(max-width: 1200px)");

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
        white-space: nowrap;
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
        background-color: var(--color-bg);
      }

      bg-close-button {
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
    const menu = this.#menuRef.value;
    menu.showModal();
    menu.animate(
      [
        { transform: "translateX(min(var(--nav-menu-width), 100vw))" },
        { transform: "translateX(0)" }
      ],
      { duration: 300, easing: "ease-in-out" }
    );
  }

  closeMenu() {
    const menu = this.#menuRef.value;
    const animation = menu.animate(
      [{ transform: "translateX(min(var(--nav-menu-width), 100vw))" }],
      { duration: 300, easing: "ease-in-out" }
    );
    animation.onfinish = () => menu.close();
  }

  handleDialogClick(event) {
    if (event.target === this.#menuRef.value) this.closeMenu();
  }

  render() {

    const menu = html`
      <bg-menu-button @click="${this.openMenu}">
        <slot name="trigger"></slot>
      </bg-menu-button>
      <dialog @click="${this.handleDialogClick}" ${ref(this.#menuRef)}>
        <slot name="menu"></slot>
        <bg-close-button @click="${this.closeMenu}">Close</bg-close-button>
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