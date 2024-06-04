export class MediaQueryController {

  constructor(host, media) {
    this.host = host;
    host.addController(this);
    this.mql = window.matchMedia(media);
    this.matches = this.mql.matches;
  }

  hostConnected() {
    this.mql.addEventListener("change", ({matches}) => {
      this.matches = matches;
      this.host.requestUpdate();
    });
  }
}