import { NavigationBar } from "./navigation/navbar.js";
import { NavigationBarMenu } from "./navigation/navbar-menu.js";
import { HeroSection } from "./hero/hero.js";
import { ButtonClose } from "./button/close/button-close.js"
import { LanguageSelect } from "./language/language-select.js";
import { ContactForm } from "./form/contact-form.js";
import { Icon } from "./icon/icon.js";

window.customElements.define('bg-navbar', NavigationBar);
window.customElements.define('bg-navbar-menu', NavigationBarMenu);
window.customElements.define('bg-hero', HeroSection);
window.customElements.define('bg-button-close', ButtonClose);
window.customElements.define('bg-language-select', LanguageSelect);
window.customElements.define('bg-contact-form', ContactForm);
window.customElements.define('bg-icon', Icon);