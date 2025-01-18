import { LitElement, html } from 'lit';

export class Footer extends LitElement {
  render() {
    return html`
      <footer class="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 SmartSenseLink</p>
      </footer>
    `;
  }
}

customElements.define('app-footer', Footer);
