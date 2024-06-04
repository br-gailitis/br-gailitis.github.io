document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname;

  const language = window.sessionStorage.getItem('language') || new Intl.Locale(navigator.language).language;

  if (path.startsWith(`/${language}/`)) return;

  const redirectToLanguage = (lang) => {
    window.location.href = path.replace(/^\/([A-Za-z]{2}\/)|\//, `/${lang}/`);
  }

  switch (language) {
    case 'lv':
      redirectToLanguage(language);
      break;
    default:
      redirectToLanguage('en');
  }

});