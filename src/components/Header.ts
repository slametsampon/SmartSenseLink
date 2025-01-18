import { LitElement, html } from 'lit';

export class Header extends LitElement {
  render() {
    return html`
      <header class="bg-green-500 text-white p-4 text-center">
        <h1 class="text-xl font-bold">SmartSenseLink</h1>
      </header>
    `;
  }
}

customElements.define('app-header', Header);
