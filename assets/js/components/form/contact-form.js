import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { FormErrorCode, FormStatus } from './constants.js';

export class ContactForm extends LitElement {

  #formRef = createRef();

  static styles = [
    css`
      :host {
        position: relative;
        display: block;
      }

      form {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      form.success {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      #success {
        display: none;
      }

      form.success ~ #success {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        background-color: var(--color-primary);
        color: var(--color-primary-invert);
        border-radius: 1rem;
      }

      label {
        display: flex;
        flex-direction: column;
      }

      form {
        gap: 2rem
      }

      label, button {
        grid-column-end: span 2; 
        gap: 0.5em;
      }

      label .label {
        font-size: 0.8em;
      }

      input, textarea, select, button {
        font: var(--font-base);
        font-size: 1.35rem;
        height: 3rem;
        padding: 0 0.5em;
        border-radius: 0.25rem;
      }

      input, textarea, select {
        border: 1px solid var(--input-border-color);
      }

      textarea {
        min-height: 6rem;
        padding: 0.5em 0.5em;
      }

      input:user-invalid,
      textarea:user-invalid {
        outline: 1px solid var(--color-error);
      }

      input ~ .error {
        color: var(--color-error);
        display: none;
      }

      input:user-invalid ~ .error {
        display: block;
      }

      button {
        font-weight: var(--font-weight-bold);
        border: none;
        background-color: var(--color-primary);
        color: var(--color-primary-invert);
        transition: background-color 100ms ease-in-out;
      }

      button:hover {
        background-color: var(--color-primary-highlight);
      }

      @media (max-width: 1000px) {
        form {
          display: flex;
          flex-direction: column;
        }
      }
    `,
  ]

  static get properties() {
    return {
      action: { type: String },
      method: { type: String },
      language: { type: String },
      status: { type: String, state: true },
      statusMessage: { type: String, state: true },
      messages: { type: Object, state: true }
    }
  }

  constructor() {
    super();
    this.language = new Intl.Locale(navigator.language).language;
    this.status = '';
    this.statusMessage = '';
    this.messages = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyMessages();
  }

  firstUpdated() {
    this.initializeAllInputs();
  }

  applyMessages() {
    this.messages = {...this.messages, ...this.dataset };
    Object.keys(this.dataset).forEach(key => delete this.dataset[key]);
  }

  initializeAllInputs() {
    const inputs = this.querySelectorAll('input, select, textarea');
    this.#formRef.value.prepend(...inputs);
    inputs.forEach(this.initializeInput.bind(this));
  }

  initializeInput(input) {
    const label = document.createElement('label');

    label.innerHTML = `
      <span class="label">
        ${input.dataset.label}
        ${input.required ? '' : `(${this.messages.fieldOptional})`}
      </span>
    `;
  
    Object.assign(label.style, {
      gridColumnEnd: `span ${input.dataset.colspan || 2}`
    });

    const message = document.createElement('span');
    message.className = 'error';

    input.replaceWith(label);

    input.addEventListener('input', () => input.setCustomValidity(''));
    input.addEventListener('blur', () => input.setCustomValidity(''));

    label.append(input);
    label.append(message);
  }

  parseFormspreeErrorCode(code) {
    switch(code) {
      case FormErrorCode.RequiredFieldMissing:
      case FormErrorCode.RequiredFieldEmpty:
        return this.messages.errorRequired || 'required';
      case FormErrorCode.TypeNumeric:
        return this.messages.errorNumeric || 'should be numeric';
      case FormErrorCode.TypeEmail:
        return this.messages.errorEmail || 'should be an email';
      case FormErrorCode.TypeText:
        return this.messages.errorText || 'should include text';
      default:
        return code;
    }
  }

  handleFormspreeErrors(errors) {

    errors.forEach(({ code, field }) => {
      const input = this.#formRef.value[field];
      const error = input.nextElementSibling;
      const message = this.parseFormspreeErrorCode((code));
      input.setCustomValidity(message);
      error.innerHTML  = message;
    })

    this.#formRef.value.reportValidity();
  }

  handleUnknownError() {
    this.statusMessage = this.messages.unknownError || 'An unknown error occurred';
  }

  handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(async response => {
        if (response.ok) {
          this.status = FormStatus.Success;
          form.reset()
        } else {
          this.status = FormStatus.Failure;
          const data = await response.json();
          if (Object.hasOwn(data, 'errors')) {
            this.handleFormspreeErrors(data.errors);
          } else {
            this.handleUnknownError();
          }
        }
      }).catch(() => {
        this.status = FormStatus.Failure
      });
  }

  render() {
    return html`
      <form
        ${ref(this.#formRef)}
        action="${this.action}"
        method="${this.method}"
        @submit="${this.handleSubmit}"
        class="${this.status === FormStatus.Success ? FormStatus.Success : ''}"
      >
        <input type="hidden" name="_language" value="${this.language}">
        <button type="submit">Submit</button>
      </form>
      <div id="success">
        ${this.messages.success}
      </div>
    `;
  }
}