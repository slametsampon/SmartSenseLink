Berikut adalah **langkah-langkah konfigurasi dan setup SmartSenseLink** yang mencakup semua kebutuhan Anda, terintegrasi penuh dengan fitur-fitur yang diminta.

---

## **1. Konfigurasi Folder**

Struktur folder untuk proyek ini:

```plaintext
smartsense-link/
├── data/                    # File untuk upload ke LittleFS ESP32-C3
│   ├── dist/                # Hasil build (CSS & JS)
│   │   ├── bundle.js
│   │   └── styles.css
│   ├── index.html           # Halaman utama aplikasi
│   └── assets/              # Aset statis (gambar, ikon, dll.)
├── public/                  # File untuk demo di GitHub Pages
│   ├── index.html
│   ├── dist/                # Hasil build (CSS & JS)
│   └── assets/              # Aset statis
├── src/                     # Source code aplikasi
│   ├── components/          # Komponen LitElement
│   │   ├── Header.ts        # Komponen Header
│   │   ├── Footer.ts        # Komponen Footer
│   │   └── AboutContent.ts  # Main content untuk laman About
│   ├── styles/              # Konfigurasi Tailwind CSS
│   │   └── tailwind.css
│   ├── App.ts               # Komponen root aplikasi
│   └── main.ts              # Entry point aplikasi
├── scripts/                 # Skrip untuk build & deployment
│   ├── build.js             # Skrip build untuk production
│   ├── dev.js               # Skrip untuk development mode
│   ├── deploy-github.js     # Deploy ke GitHub Pages
│   └── deploy-littlefs.js   # Upload ke LittleFS
├── .github/                 # Workflow GitHub Actions
│   └── workflows/
│       └── deploy.yml       # Workflow untuk deploy otomatis ke GitHub Pages
├── tailwind.config.js       # Konfigurasi Tailwind CSS
├── package.json             # Konfigurasi npm
├── tsconfig.json            # Konfigurasi TypeScript
├── .gitignore               # File/folder yang diabaikan Git
├── README.md                # Dokumentasi proyek
└── LICENSE                  # Lisensi proyek
```

---

## **2. Setup Project dan Instalasi Dependensi**

1. **Inisialisasi Proyek:**

   ```bash
   mkdir smartsense-link
   cd smartsense-link
   npm init -y
   ```

2. **Instal Dependensi:**

   ```bash
   npm install lit tailwindcss esbuild typescript live-server --save-dev
   ```

3. **Generate Tailwind Config:**

   ```bash
   npx tailwindcss init
   ```

4. **Buat File `tsconfig.json`:**
   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "ES6",
       "moduleResolution": "node",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true
     },
     "include": ["src/**/*"]
   }
   ```

---

## **3. Konfigurasi `tailwind.config.js`**

Letakkan di **root** dan sesuaikan:

```javascript
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## **4. Skrip `dev`, `build`, `deploy`**

Tambahkan ke `package.json`:

```json
"scripts": {
  "dev": "node scripts/dev.js",
  "build": "node scripts/build.js",
  "deploy:github": "node scripts/deploy-github.js",
  "deploy:esp32": "node scripts/deploy-littlefs.js"
}
```

### a. **File `scripts/dev.js`**

```javascript
const esbuild = require('esbuild');
const liveServer = require('live-server');
const { exec } = require('child_process');

const buildTailwind = () => {
  exec(
    'npx tailwindcss -i ./src/styles/tailwind.css -o ./public/dist/styles.css --watch',
    (err) => {
      if (err) console.error('Tailwind CSS Error:', err);
    }
  );
};

esbuild
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    sourcemap: true,
    outfile: './public/dist/bundle.js',
    watch: true,
  })
  .then(() => {
    console.log('Watching for changes...');
  })
  .catch((err) => {
    console.error('Build error:', err);
    process.exit(1);
  });

buildTailwind();
liveServer.start({ root: './public', port: 8080 });
```

### b. **File `scripts/build.js`**

```javascript
const esbuild = require('esbuild');
const { exec } = require('child_process');

exec(
  'npx tailwindcss -i ./src/styles/tailwind.css -o ./data/dist/styles.css --minify',
  () => {
    console.log('Tailwind CSS built.');
  }
);

esbuild
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: true,
    outfile: './data/dist/bundle.js',
  })
  .then(() => {
    console.log('Build complete!');
  })
  .catch((err) => {
    console.error('Build error:', err);
  });
```

### c. **File `scripts/deploy-github.js`**

```javascript
const { exec } = require('child_process');
exec(
  `
  cd public &&
  git init &&
  git remote add origin https://github.com/username/smartsense-link.git &&
  git add . &&
  git commit -m "Deploy to GitHub Pages" &&
  git push -f origin main:gh-pages
`,
  (err) => {
    if (err) console.error('Deploy error:', err);
    else console.log('Deployed to GitHub Pages.');
  }
);
```

### d. **File `scripts/deploy-littlefs.js`**

```javascript
const { exec } = require('child_process');
exec(
  'arduino-cli upload --port /dev/ttyUSB0 --fqbn esp32:esp32:esp32c3 --filesystem --input-dir ./data',
  (err) => {
    if (err) console.error('Upload error:', err);
    else console.log('Uploaded to LittleFS.');
  }
);
```

---

## **5. Menggunakan Tailwind CSS Secara Penuh**

Buat file `src/styles/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import di `src/main.ts`:

```typescript
import './styles/tailwind.css';
import './App';
```

---

## **6. Contoh Laman About**

### a. `src/components/Header.ts`

```typescript
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
```

### b. `src/components/Footer.ts`

```typescript
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
```

### c. `src/components/AboutContent.ts`

```typescript
import { LitElement, html } from 'lit';

export class AboutContent extends LitElement {
  render() {
    return html`
      <main class="p-4">
        <h2 class="text-2xl font-bold text-center mb-4">About</h2>
        <p class="text-center text-gray-600">
          SmartSenseLink is an IoT platform designed for smart applications.
        </p>
      </main>
    `;
  }
}

customElements.define('about-content', AboutContent);
```

### d. `src/App.ts`

```typescript
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
```

---

## **7. Jalankan Proyek**

- **Development Mode:**

  ```bash
  npm run dev
  ```

- **Build untuk Production:**

  ```bash
  npm run build
  ```

- **Deploy ke GitHub Pages:**

  ```bash
  npm run deploy:github
  ```

- **Upload ke LittleFS ESP32-C3:**
  ```bash
  npm run deploy:esp32
  ```

Dengan setup ini, Anda memiliki integrasi penuh untuk development, build, dan deployment! 😊

Dengan implementasi **router sederhana** seperti pada jawaban sebelumnya, tombol **Back** dan **Forward** di browser akan bekerja **hanya jika Anda sudah menambahkan event listener untuk perubahan URL**. Perubahan URL yang terjadi karena **popstate event** (seperti ketika tombol Back atau Forward di-click) harus disinkronkan dengan aplikasi.

Berikut adalah langkah-langkah untuk membuat tombol Back dan Forward di browser berfungsi dengan baik:

---

### **1. Update Router**

Modifikasi file `src/router.ts` untuk menangani event `popstate`. Berikut adalah versi yang diperbarui:

#### **`src/router.ts`**

```typescript
import { html, LitElement } from 'lit';

class Router extends LitElement {
  static routes = {
    '/': html`<home-page></home-page>`,
    '/about': html`<about-page></about-page>`,
    '/contact': html`<contact-page></contact-page>`,
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', () => this.requestUpdate()); // Handle Back/Forward button
  }

  navigate(path: string) {
    if (window.location.pathname !== path) {
      history.pushState(null, '', path); // Update URL without reloading
    }
    this.requestUpdate(); // Refresh content
  }

  render() {
    const route =
      Router.routes[window.location.pathname] ||
      html`<not-found-page></not-found-page>`;
    return html`${route}`;
  }
}

customElements.define('app-router', Router);
```

---

### **2. Update Navigasi di `App.ts`**

Pastikan navigasi dari link memicu fungsi `navigate` tanpa reload browser. Berikut adalah versi yang sudah diperbarui:

#### **`src/App.ts`**

```typescript
import { LitElement, html } from 'lit';
import './components/Header';
import './components/Footer';
import './router';
import './components/HomePage';
import './components/AboutPage';
import './components/ContactPage';
import './components/NotFoundPage';

class App extends LitElement {
  render() {
    return html`
      <app-header></app-header>
      <nav class="p-4 bg-gray-100 flex justify-center space-x-4">
        <a
          href="/"
          @click="${this.navigate}"
          class="text-blue-500 hover:underline"
          >Home</a
        >
        <a
          href="/about"
          @click="${this.navigate}"
          class="text-blue-500 hover:underline"
          >About</a
        >
        <a
          href="/contact"
          @click="${this.navigate}"
          class="text-blue-500 hover:underline"
          >Contact</a
        >
      </nav>
      <app-router></app-router>
      <app-footer></app-footer>
    `;
  }

  navigate(event: Event) {
    event.preventDefault();
    const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
    const router = this.shadowRoot!.querySelector('app-router') as any;
    router.navigate(path);
  }
}

customElements.define('app-root', App);
```

---

### **3. Penjelasan Update**

- **`popstate` event listener di `router.ts`:**

  - Menjamin bahwa aplikasi mendeteksi perubahan URL ketika tombol **Back** atau **Forward** di-click.
  - Fungsi `this.requestUpdate()` memastikan aplikasi memperbarui konten sesuai URL baru.

- **Fungsi `navigate` di `App.ts`:**

  - Memastikan bahwa URL diperbarui menggunakan `history.pushState` tanpa reload.
  - Menggunakan referensi ke `app-router` untuk memanggil metode `navigate`.

- **404 Page (Halaman Tidak Ditemukan):**
  - Jika URL tidak sesuai dengan rute yang didefinisikan, halaman **Not Found** akan ditampilkan.

---

### **4. Testing Fitur Back dan Forward**

1. Jalankan aplikasi dengan `npm run dev`.
2. Buka aplikasi di browser (`http://localhost:8080`).
3. Klik navigasi antar halaman:
   - Home
   - About
   - Contact
4. Gunakan tombol **Back** dan **Forward** di browser untuk berpindah kembali ke halaman sebelumnya.

---

### **5. Pengaturan Tambahan untuk Deployment di GitHub Pages**

Agar **Back** dan **Forward** juga berfungsi di GitHub Pages:

- Tambahkan fallback route di `index.html` (seperti yang dijelaskan sebelumnya).
- Semua request akan dialihkan ke root (`index.html`), dan router di aplikasi akan menangani konten yang sesuai.

```html
<script>
  if (location.pathname !== '/' && !location.pathname.startsWith('/dist')) {
    history.replaceState(null, null, '/');
  }
</script>
```

---

### **6. Kesimpulan**

Setelah update:

1. **Back** dan **Forward** di browser bekerja tanpa masalah.
2. Router mendeteksi perubahan URL melalui **popstate** event.
3. Sistem kompatibel untuk **ESP32 LittleFS** dan **GitHub Pages** tanpa reload halaman.

Apakah ada fitur tambahan yang ingin ditambahkan? 😊
