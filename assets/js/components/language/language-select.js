import {LitElement, html, css} from 'lit';

export class LanguageSelect extends LitElement {

  static styles = [
    css`
      :host {
        position: relative;
        --icon-size: 1.75em;
        --select-padding: 0.75em;
        --select-height: 2.5rem;
      }

      :host, * {
        font: var(--font-base);
        font-size: var(--font-size-small);
        line-height: 2;
      }

      select {
        border: 0;
        background: rgba(var(--color-grey-rgb),0.1);
        padding-left: calc(var(--icon-size) + var(--select-padding) * 2);
        padding-right: var(--select-padding);
        height: var(--select-height);
        border-radius: 0.5em;
        appearance: none;
      }

      bg-icon {
        position: absolute;
        top: calc((var(--select-height) - var(--icon-size)) / 2);
        left: var(--select-padding);
        height: var(--icon-size);
        width: var(--icon-size);
      }

    `
  ]

  static get properties() {
    return {
      languages: { type: Array }
    }
  }

  constructor() {
    super();
    this.languages = ['en', 'lv'];
  }

  selectLanguage(event) {
    window.sessionStorage.setItem('language', event.currentTarget.value);
    // window.handleUserLanguage();
    this.dispatchEvent(new Event('updatelanguage', { bubbles: true, composed: true }))
  }

  get currentLanguage() {
    return window.sessionStorage.getItem('language') || new Intl.Locale(window.navigator.language).language;
  }

  getRegionalLanguageName(lang) {
    return new Intl.DisplayNames(lang, { type: 'language' }).of(lang);
  }

  render() {
    const options = this.languages.map(lang => html`
      <option
        .selected="${this.currentLanguage === lang}"
        value="${lang}"
      >
        ${this.getRegionalLanguageName(lang)}
      </option>
    `);

    return html`
      <select @change="${this.selectLanguage}">
        ${options}
      </select>
      <bg-icon name="globe"></bg-icon>
    `;
  }
}