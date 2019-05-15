import { LitElement, html, css } from 'lit-element';

class AppTheme extends LitElement {
  constructor() {
    super();
    this.theme = "Dark";
  }
  
  static get properties() {
    return {
      theme: { type: String },
    }
  }
  
  static get styles(){
    return css`
    :host {
      cursor: pointer;
      display: inline-block;
    }
    input {
      display: none;
    }
    `;
  }
  
  changeTheme() {
    this.theme = this.theme == "Light" ? "Dark" : "Light";
    if (this.theme != "Dark") {
      document.documentElement.style.setProperty("--app-bg-color", "#2b2b2b");
      document.body.style.setProperty("--app-bg-color", "#2b2b2b");
      document.body.style.setProperty("--app-text-color", "#ffffff");
      document.body.style.setProperty("--app-header-shadow", "0px 2px 20px rgba(29, 29, 29, 0.5)");
    } else {
      document.documentElement.style.setProperty("--app-bg-color", "#ffffff");
      document.body.style.setProperty("--app-bg-color", "#ffffff");
      document.body.style.setProperty("--app-text-color", "#313131");
      document.body.style.setProperty("--app-header-shadow", "0px 2px 20px rgba(229, 229, 229, 0.5)");
    }
  }
  
  render() {
    return html`
    <link rel="stylesheet" href="/node_modules/spectre.css/dist/spectre.min.css">
    <link rel="stylesheet" href="/node_modules/spectre.css/dist/spectre-exp.css">
    <link rel="stylesheet" href="/node_modules/spectre.css/dist/spectre-icons.css">

    <div class="form-group">
      <label class="form-switch">
        <input type="checkbox" name="theme" id="theme" @change="${this.changeTheme}">
        <i class="form-icon"></i>
      </label>
    </div>
    
    `;
  }
}

customElements.define('app-theme', AppTheme);