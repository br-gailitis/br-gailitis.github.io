import { NavigationBar } from "./navigation/navbar.js";
import { HeroSection } from "./hero/hero.js";
import { CloseButton } from "./button/close/close-button.js"
import { MenuButton } from "./button/menu/menu-button.js"
import { LanguageSelect } from "./language/language-select.js";
import { ContactForm } from "./form/contact-form.js";
import { Icon } from "./icon/icon.js";

window.customElements.define('bg-navbar', NavigationBar);
window.customElements.define('bg-hero', HeroSection);
window.customElements.define('bg-close-button', CloseButton);
window.customElements.define('bg-menu-button', MenuButton);
window.customElements.define('bg-language-select', LanguageSelect);
window.customElements.define('bg-contact-form', ContactForm);
window.customElements.define('bg-icon', Icon);