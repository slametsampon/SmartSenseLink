import { LitElement, html } from 'lit';

export class AboutContent extends LitElement {
  render() {
    return html`
      <main class="p-4">
        <h2 class="text-2xl font-bold text-center mb-4">About</h2>
        <p class="text-center text-gray-600">
          SmartSenseLink is an IoT platform designed for smart applications.
        </p>
        <p>Testing 4th</p>
      </main>
    `;
  }
}

customElements.define('about-content', AboutContent);
