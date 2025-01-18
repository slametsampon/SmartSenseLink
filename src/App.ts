import { LitElement, html } from 'lit';
import './components/Header';
import './components/Footer';
import './components/AboutContent';

export class App extends LitElement {
  render() {
    return html`
      <app-header></app-header>
      <about-content></about-content>
      <app-footer></app-footer>
    `;
  }
}

customElements.define('app-root', App);
