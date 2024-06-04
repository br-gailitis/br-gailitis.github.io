import {LitElement, html, css} from 'lit';

export class LanguageSelect extends LitElement {

  static styles = [
    css`
      :host {
        display: flex;
        gap: 16px;
      }

      button {
        border: 0;
        background: rgba(0,0,0,0.1);
        padding: 0.5em 1em;
        height: 2rem;
        border-radius: 0.5em;
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
    window.location.reload();
  }

  get currentLanguage() {
    return window.sessionStorage.getItem('language') || new Intl.Locale(window.navigator.language).language;
  }

  getRegionalLanguageName(lang) {
    return new Intl.DisplayNames(this.currentLanguage, { type: 'language' }).of(lang);
  }

  render() {
    return this.languages.map(lang => html`
      <button @click="${this.selectLanguage}" value="${lang}">${this.getRegionalLanguageName(lang)}</button>
    `);
  }
}