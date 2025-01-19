- [**Pengantar: Membangun SPA Elegan di Dunia IoT dengan ESP32-C3**](#pengantar-membangun-spa-elegan-di-dunia-iot-dengan-esp32-c3)
  - [**Kenapa SPA di IoT?**](#kenapa-spa-di-iot)
  - [**Apa yang Akan Kita Buat?**](#apa-yang-akan-kita-buat)
  - [**Lingkungan Pengembangan**](#lingkungan-pengembangan)
  - [**Kriteria Desain yang Kita Ikuti**](#kriteria-desain-yang-kita-ikuti)
  - [**Mengapa Anda Harus Mencoba Ini?**](#mengapa-anda-harus-mencoba-ini)
- [**Langkah 1: Struktur Folder**](#langkah-1-struktur-folder)
- [**Langkah 2: Inisialisasi Proyek dengan NPM**](#langkah-2-inisialisasi-proyek-dengan-npm)
- [**Langkah 3: Inisialisasi Git dan Repository**](#langkah-3-inisialisasi-git-dan-repository)
- [**Langkah 4: Instalasi Dependensi**](#langkah-4-instalasi-dependensi)
  - [**1. Install dependensi dasar:**](#1-install-dependensi-dasar)
  - [**2. Inisialisasi Tailwind CSS:**](#2-inisialisasi-tailwind-css)
  - [**3. Konfigurasi file Tailwind CSS:**](#3-konfigurasi-file-tailwind-css)
  - [**4. Tambahkan skrip build di `package.json`:**](#4-tambahkan-skrip-build-di-packagejson)
  - [**5. Lebih detail dengan konfigurasi esbuild:**](#5-lebih-detail-dengan-konfigurasi-esbuild)
- [**Langkah 5: Implementasi Tailwind CSS**](#langkah-5-implementasi-tailwind-css)
- [**Langkah 6: Implementasi Halaman Home, About, Help dan Routing**](#langkah-6-implementasi-halaman-home-about-help-dan-routing)
  - [1. **Komponen Header**](#1-komponen-header)
  - [2. **Komponen Footer**](#2-komponen-footer)
  - [3. **Halaman Home**](#3-halaman-home)
  - [4. **Halaman Help**](#4-halaman-help)
  - [5. **Halaman About**](#5-halaman-about)
  - [6. **Routing Tanpa Library (Optional)**](#6-routing-tanpa-library-optional)
    - [**1. Logika Dasar Routing Manual**](#1-logika-dasar-routing-manual)
    - [**2. Mengatur Rute dan Halaman**](#2-mengatur-rute-dan-halaman)
    - [**3. Buat Komponen Halaman**](#3-buat-komponen-halaman)
    - [**4. Entry Point**](#4-entry-point)
    - [**5. Build dan Upload ke ESP32-C3**](#5-build-dan-upload-ke-esp32-c3)
    - [**6. Keuntungan Routing Manual**](#6-keuntungan-routing-manual)
- [**Langkah 7: Entry Point dan Index**](#langkah-7-entry-point-dan-index)
- [**Langkah 8: Build dan Hosting di GitHub Pages**](#langkah-8-build-dan-hosting-di-github-pages)
  - [**1. Persiapan Repository**](#1-persiapan-repository)
  - [**2. Install Plugin GitHub Pages**](#2-install-plugin-github-pages)
  - [**3. Update Konfigurasi `package.json`**](#3-update-konfigurasi-packagejson)
  - [**4. Build dan Deploy Proyek**](#4-build-dan-deploy-proyek)
  - [**5. Aktifkan GitHub Pages**](#5-aktifkan-github-pages)
  - [**6. Akses Website**](#6-akses-website)
  - [**Tips**](#tips)
- [**Langkah 9: Deploy aplikasi ke ESP32-C3**](#langkah-9-deploy-aplikasi-ke-esp32-c3)
  - [**Langkah 1: Persiapan File Build**](#langkah-1-persiapan-file-build)
  - [**Langkah 2: Konversi File untuk ESP32-C3**](#langkah-2-konversi-file-untuk-esp32-c3)
  - [**Langkah 3: Kode ESP32-C3 untuk Web Server**](#langkah-3-kode-esp32-c3-untuk-web-server)
  - [**Langkah 4: Upload File ke LittleFS**](#langkah-4-upload-file-ke-littlefs)
  - [**Langkah 5: Upload Firmware**](#langkah-5-upload-firmware)
  - [**Langkah 6: Akses Website**](#langkah-6-akses-website)
  - [**Catatan**](#catatan)

### **Pengantar: Membangun SPA Elegan di Dunia IoT dengan ESP32-C3**

Halo para praktisi dan penggiat teknologi! 👋  
Pernahkah Anda ingin menggabungkan teknologi modern seperti **Single Page Application (SPA)** dengan kekuatan **Internet of Things (IoT)**? Dalam artikel ini, kita akan mengupas tuntas bagaimana membangun SPA menggunakan **LitElement**, dengan **Tailwind CSS** untuk gaya, **TypeScript** untuk logika, dan **esbuild** sebagai alat build andalan—semua dihosting langsung pada **ESP32-C3**. 🎉

---

#### **Kenapa SPA di IoT?**

Sebagai pengembang, kita sering menghadapi kebutuhan membuat antarmuka web yang responsif, cepat, dan interaktif untuk perangkat IoT seperti ESP32-C3. Dengan pendekatan **SPA**, kita dapat:

1. **Navigasi Tanpa Reload:** Menghindari pemuatan ulang setiap kali berpindah halaman.
2. **Efisiensi Memori:** Mengurangi jumlah file yang diunggah ke sistem file ESP32.
3. **Desain Modular:** Memanfaatkan komponen reusable seperti Header dan Footer.
4. **Modern & Rapi:** Kombinasi LitElement dan Tailwind CSS menghasilkan UI minimalis dengan logika terorganisir.

---

#### **Apa yang Akan Kita Buat?**

Sebuah proyek **SPA multipage** dengan halaman **Home**, **About**, dan **Help**, masing-masing memiliki:

- **Header:** Navbar navigasi antar halaman.
- **Main Content:** Konten utama yang unik untuk setiap halaman.
- **Footer:** Informasi umum di bagian bawah.

Dan yang membuat ini menarik, semua akan dihosting pada **ESP32-C3** sebagai server. Tidak hanya itu, Anda juga dapat menggunakan **GitHub Pages** sebagai opsi alternatif hosting untuk kebutuhan pengembangan.

---

#### **Lingkungan Pengembangan**

Untuk memulai, pastikan Anda memiliki perangkat dan alat berikut:

- **Operating System:** Windows 10.
- **IDE:** Visual Studio Code (VS Code), lengkap dengan plugin seperti:
  - **Tailwind CSS IntelliSense**
  - **ESLint**
  - **Prettier**
- **Perangkat IoT:** ESP32-C3 yang mendukung LittleFS atau SPIFFS sebagai sistem file.

---

#### **Kriteria Desain yang Kita Ikuti**

1. **Framework:** **LitElement** untuk pengembangan komponen web modern.
2. **Style:** **Tailwind CSS** untuk styling cepat dan konsisten.
3. **Programming:** **TypeScript** untuk pengkodean yang lebih terstruktur dan tipe aman.
4. **Building Tool:** **esbuild** untuk proses bundling cepat dan ringan.
5. **Metodologi:** Component-Driven Development (CDD) atau Object-Oriented Programming (OOP) untuk modularitas.
6. **Hosting:** Di **ESP32-C3** untuk penggunaan di perangkat IoT, dengan opsi deploy ke **GitHub Pages**.
7. **Struktur File:** Semua konfigurasi diletakkan di root direktori untuk kesederhanaan pengelolaan.
8. **Navigasi:** Routing manual tanpa library tambahan untuk menghemat ruang penyimpanan di ESP32.

---

#### **Mengapa Anda Harus Mencoba Ini?**

- **Praktis:** Proyek ini mencakup semua kebutuhan dasar untuk aplikasi IoT yang modern.
- **Terintegrasi:** Hosting di ESP32 memungkinkan Anda mengontrol aplikasi secara langsung dari perangkat IoT.
- **Fleksibel:** Dengan GitHub Pages sebagai alternatif hosting, Anda bisa mengembangkan dan berbagi proyek lebih mudah.
- **Terorganisir:** LitElement dan Tailwind CSS menjaga proyek tetap rapi, konsisten, dan mudah diperbarui.

---

Yuk, kita mulai perjalanan menarik ini! 🚀  
Langkah demi langkah, kita akan menyiapkan SPA yang elegan dan efisien untuk ESP32-C3. Anda siap? Mari kita bangun sesuatu yang luar biasa! 😄
🎉 Dengan routing manual ini, Anda tetap dapat menjalankan aplikasi SPA pada ESP32-C3 dengan ukuran file yang minimal.

Berikut adalah panduan langkah-langkah untuk melakukan konfigurasi dan setup **SPA (Single Page Aplication)** sesuai dengan kriteria yang disebutkan.

---

### **Langkah 1: Struktur Folder**

Struktur folder awal untuk proyek multipage berbasis LitElement dengan Tailwind CSS dan TypeScript:

```
SPA/
├── src/
│   ├── components/    # Folder untuk komponen (Header, Footer, dll.)
│   ├── pages/         # Folder untuk laman Home, About, Help
│   ├── index.html     # Halaman utama yang menjadi entry point
│   ├── styles.css     # File utama Tailwind CSS
├── esbuild.config.js  # Konfigurasi esbuild
├── package.json       # Konfigurasi NPM dan dependensi
├── tailwind.config.js # Konfigurasi Tailwind CSS
├── tsconfig.json      # Konfigurasi TypeScript
├── .gitignore         # File .gitignore
├── README.md          # Dokumentasi proyek
```

---

### **Langkah 2: Inisialisasi Proyek dengan NPM**

1. Buka terminal di root folder proyek.
2. Jalankan perintah berikut untuk inisialisasi proyek:
   ```bash
   mkdir SPA
   cd SPA
   npm init -y
   ```
   Ini akan menghasilkan file `package.json`.

---

### **Langkah 3: Inisialisasi Git dan Repository**

1. Inisialisasi git:
   ```bash
   git init
   ```
2. Buat file `.gitignore`:
   ```plaintext
   node_modules/
   dist/
   .env
   ```
3. Commit awal:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```
4. Hubungkan ke repository GitHub:
   ```bash
   git remote add origin https://github.com/username/SPA.git
   git branch -M main
   git push -u origin main
   ```

---

### **Langkah 4: Instalasi Dependensi**

#### **1. Install dependensi dasar:**

```bash
npm install lit tailwindcss esbuild typescript
```

#### **2. Inisialisasi Tailwind CSS:**

```bash
npx tailwindcss init
```

Konfigurasi default akan menghasilkan file `tailwind.config.js`.

#### **3. Konfigurasi file Tailwind CSS:**

- Edit `tailwind.config.js` untuk mengatur path yang sesuai:
  ```javascript
  module.exports = {
    content: ['./src/**/*.html', './src/**/*.ts'],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

#### **4. Tambahkan skrip build di `package.json`:**

```json
"scripts": {
  "build": "esbuild src/index.html --bundle --outfile=dist/index.html --minify",
  "watch": "esbuild src/index.html --bundle --outfile=dist/index.html --watch",
  "start": "npm run build && npm run watch"
}
```

#### **5. Lebih detail dengan konfigurasi esbuild:**

Penggunaan file konfigurasi seperti `esbuild.config.js` **tidak wajib** jika Anda hanya menggunakan perintah **CLI** (Command Line Interface) dari esbuild untuk membuild proyek. Namun, jika Anda ingin fleksibilitas lebih besar atau menghindari perintah CLI yang panjang dan kompleks, menggunakan file `esbuild.config.js` sangat direkomendasikan.

Berikut adalah contoh konfigurasi **`esbuild.config.js`** untuk proyek Anda:

---

**Contoh `esbuild.config.js`**

Buat file `esbuild.config.js` di root direktori proyek Anda:

```javascript
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['src/index.html'], // File entry utama
    outdir: 'dist', // Folder output untuk file hasil build
    bundle: true, // Bundle semua file ke satu file
    minify: true, // Minifikasi file
    sourcemap: false, // Tidak menghasilkan source map
    loader: {
      '.ts': 'ts', // Loader untuk TypeScript
      '.css': 'css', // Loader untuk CSS
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    watch: process.argv.includes('--watch'), // Watch mode jika diaktifkan
  })
  .catch(() => process.exit(1));
```

---

**Penjelasan**

- **`entryPoints`:** Menentukan file utama yang akan dibuild.
- **`outdir`:** Direktori tempat file hasil build akan disimpan.
- **`bundle`:** Menggabungkan semua dependensi menjadi satu file.
- **`minify`:** Mengurangi ukuran file untuk produksi.
- **`loader`:** Menentukan bagaimana file dengan ekstensi tertentu diproses (misal: `.ts` dan `.css`).
- **`define`:** Digunakan untuk mendefinisikan variabel global, seperti `NODE_ENV`.
- **`watch`:** Menambahkan mode **watch** untuk otomatis membuild saat ada perubahan.

---

**Menjalankan Build**
Tambahkan skrip di `package.json` untuk menjalankan build menggunakan konfigurasi ini:

```json
"scripts": {
  "build": "node esbuild.config.js",
  "watch": "node esbuild.config.js --watch"
}
```

---

**Keuntungan Menggunakan `esbuild.config.js`**

1. **Fleksibilitas:**
   - Anda dapat menambahkan konfigurasi yang kompleks atau mengatur beberapa entry point.
2. **Konsistensi:**
   - Menghindari duplikasi logika build dalam perintah CLI.
3. **Dukungan untuk Mode Watch:**
   - Lebih mudah mengaktifkan watch mode dengan flag atau argumen.

---

Jika proyek Anda masih sederhana (hanya satu file HTML), penggunaan **CLI** saja sudah cukup. Namun, untuk proyek yang lebih kompleks, **`esbuild.config.js`** akan membantu menjaga struktur proyek tetap rapi dan mudah dikelola.

---

### **Langkah 5: Implementasi Tailwind CSS**

Buat file `src/styles.css` dan tambahkan konfigurasi berikut:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### **Langkah 6: Implementasi Halaman Home, About, Help dan Routing**

#### 1. **Komponen Header**

Buat file `src/components/header.ts`:

```typescript
import { LitElement, html, css } from 'lit';

export class HeaderComponent extends LitElement {
  static styles = css`
    nav {
      @apply bg-blue-600 text-white p-4;
    }
    a {
      @apply text-white mx-2 hover:underline;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/help">Help</a>
      </nav>
    `;
  }
}
customElements.define('app-header', HeaderComponent);
```

#### 2. **Komponen Footer**

Buat file `src/components/footer.ts`:

```typescript
import { LitElement, html, css } from 'lit';

export class FooterComponent extends LitElement {
  static styles = css`
    footer {
      @apply bg-gray-800 text-white text-center p-4;
    }
  `;

  render() {
    return html`
      <footer>
        <p>&copy; 2025 SPA (Single Page Aplication)</p>
      </footer>
    `;
  }
}
customElements.define('app-footer', FooterComponent);
```

#### 3. **Halaman Home**

Buat file `src/pages/home.ts`:

```typescript
import { LitElement, html, css } from 'lit';

export class HomePage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>Welcome to SPA (Single Page Aplication)</h1>
        <p>This is the home page.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-home', HomePage);
```

#### 4. **Halaman Help**

Buat file `src/pages/help.ts`:

```typescript
import { LitElement, html, css } from 'lit';

export class HelpPage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
    h1 {
      @apply text-2xl font-bold mb-4;
    }
    p {
      @apply mb-2;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>Help & Support</h1>
        <p>If you need assistance, refer to the following resources:</p>
        <ul>
          <li>
            <a href="https://github.com/username/SPA/wiki" target="_blank"
              >Documentation</a
            >
          </li>
          <li><a href="mailto:support@SPA.com">Email Support</a></li>
          <li><a href="/faq">Frequently Asked Questions (FAQ)</a></li>
        </ul>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-help', HelpPage);
```

---

#### 5. **Halaman About**

Buat file `src/pages/about.ts`:

```typescript
import { LitElement, html, css } from 'lit';

export class AboutPage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>About SPA (Single Page Aplication)</h1>
        <p>This application is powered by ESP32-C3.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-about', AboutPage);
```

---

#### 6. **Routing Tanpa Library (Optional)**

##### **1. Logika Dasar Routing Manual**

Gunakan **hash-based routing** (`#` di URL) untuk menentukan laman mana yang sedang diakses. Logika akan memantau perubahan URL dan memuat konten yang sesuai.

Buat file `src/router.ts`:

```typescript
class Router {
  private routes: { [key: string]: () => void } = {};

  // Menambahkan rute baru
  addRoute(path: string, callback: () => void) {
    this.routes[path] = callback;
  }

  // Menangani perubahan rute
  handleRoute() {
    const path = window.location.hash.slice(1) || '/'; // Ambil path setelah #
    if (this.routes[path]) {
      this.routes[path](); // Jalankan callback untuk rute
    } else {
      console.error(`Route ${path} not found`);
    }
  }

  // Inisialisasi router
  init() {
    window.addEventListener('hashchange', () => this.handleRoute()); // Perubahan URL
    window.addEventListener('load', () => this.handleRoute()); // Saat pertama kali dimuat
  }
}

export default Router;
```

---

##### **2. Mengatur Rute dan Halaman**

Buat file `src/app.ts` untuk menghubungkan komponen dan router:

```typescript
import Router from './router';
import './pages/home';
import './pages/about';
import './pages/help';

// Inisialisasi router
const router = new Router();

// Tambahkan rute untuk setiap halaman
router.addRoute('/', () => {
  document.body.innerHTML = '<page-home></page-home>';
});
router.addRoute('/about', () => {
  document.body.innerHTML = '<page-about></page-about>';
});
router.addRoute('/help', () => {
  document.body.innerHTML = '<page-help></page-help>';
});

// Mulai router
router.init();
```

---

##### **3. Buat Komponen Halaman**

Setiap halaman akan berupa komponen LitElement. Contoh:

File: `src/pages/home.ts`

```typescript
import { LitElement, html, css } from 'lit';

export class HomePage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>Welcome to Home</h1>
        <p>This is the home page.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-home', HomePage);
```

File: `src/pages/about.ts`

```typescript
import { LitElement, html, css } from 'lit';

export class AboutPage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>About Us</h1>
        <p>This is the about page.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-about', AboutPage);
```

File: `src/pages/help.ts`

```typescript
import { LitElement, html, css } from 'lit';

export class HelpPage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>Help</h1>
        <p>If you need assistance, check our documentation.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-help', HelpPage);
```

---

##### **4. Entry Point**

Edit `src/index.html` agar menggunakan file `app.ts`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>SPA (Single Page Aplication)</title>
  </head>
  <body>
    <script type="module" src="./app.ts"></script>
  </body>
</html>
```

---

##### **5. Build dan Upload ke ESP32-C3**

1. **Build Proyek:**

   ```bash
   npm run build
   ```

   Semua file akan di-bundle menjadi satu di dalam folder `dist`.

2. **Upload ke ESP32-C3:**

   - Salin file `index.html`, `styles.css`, dan file JS hasil bundle ke folder **LittleFS** (atau SPIFFS).
   - Gunakan **ESP32 LittleFS Plugin** untuk mengunggah file ke ESP32.

3. **Server ESP32-C3:**
   Gunakan server ESP32 untuk menyajikan satu file `index.html` ke semua permintaan:
   ```cpp
   server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");
   ```

---

##### **6. Keuntungan Routing Manual**

1. **Ukuran Kecil:** Tidak memerlukan library tambahan seperti `@vaadin/router`.
2. **Kontrol Penuh:** Anda dapat menyesuaikan logika routing dengan mudah.
3. **Efisien:** Memanfaatkan hash-based routing menghindari reload penuh.

---

### **Langkah 7: Entry Point dan Index**

Buat file `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>SPA (Single Page Aplication)</title>
  </head>
  <body>
    <script>
      const path = window.location.pathname;
      if (path === '/') {
        import('./pages/home.ts');
        document.body.innerHTML = '<page-home></page-home>';
      }
      if (path === '/about') {
        import('./pages/about.ts');
        document.body.innerHTML = '<page-about></page-about>';
      }
      if (path === '/help') {
        import('./pages/help.ts');
        document.body.innerHTML = '<page-help></page-help>';
      }
    </script>
  </body>
</html>
```

---

### **Langkah 8: Build dan Hosting di GitHub Pages**

#### **1. Persiapan Repository**

1. **Pastikan Anda Sudah Memiliki Repository GitHub**  
   Jika belum, buat repository baru di GitHub:

   - Nama repository: `SPA`
   - Inisialisasi repository dengan README.md.

2. **Hubungkan Repository Lokal ke GitHub**
   Jika repository lokal belum terhubung, jalankan:
   ```bash
   git remote add origin https://github.com/username/SPA.git
   git branch -M main
   git push -u origin main
   ```

---

#### **2. Install Plugin GitHub Pages**

Tambahkan dependensi `gh-pages` untuk deploy proyek:

```bash
npm install gh-pages --save-dev
```

---

#### **3. Update Konfigurasi `package.json`**

Tambahkan konfigurasi untuk deploy ke GitHub Pages:

1. Tambahkan field `homepage`:

   ```json
   "homepage": "https://username.github.io/SPA",
   ```

2. Tambahkan skrip deploy:
   ```json
   "scripts": {
     "build": "esbuild src/index.html --bundle --outfile=dist/index.html --minify",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

---

#### **4. Build dan Deploy Proyek**

1. Build proyek:

   ```bash
   npm run build
   ```

   Ini akan menghasilkan folder `dist` berisi file hasil build.

2. Deploy ke GitHub Pages:
   ```bash
   npm run deploy
   ```
   Skrip ini akan:
   - Build proyek (jika belum dilakukan).
   - Mengunggah konten dari folder `dist` ke branch `gh-pages` di GitHub.

---

#### **5. Aktifkan GitHub Pages**

1. Buka repository Anda di GitHub.
2. Pergi ke **Settings** > **Pages**.
3. Pada bagian **Source**, pilih branch `gh-pages`, lalu klik **Save**.
4. Tunggu beberapa menit hingga GitHub Pages aktif.

---

#### **6. Akses Website**

Setelah GitHub Pages aktif, Anda dapat mengakses aplikasi Anda melalui:

```
https://username.github.io/SPA
```

---

#### **Tips**

- Jika ada masalah dengan **routing** pada multipage aplikasi:
  - Gunakan pendekatan hash-based routing (misal: `/#/home`).
  - Atau tambahkan file `.htaccess` di folder `dist` untuk menangani fallback halaman ke `index.html`.

---

### **Langkah 9: Deploy aplikasi ke ESP32-C3**

#### **Langkah 1: Persiapan File Build**

1. Pastikan aplikasi Anda telah dibuild menggunakan perintah:
   ```bash
   npm run build
   ```
2. Salin seluruh isi folder `dist` yang dihasilkan ke folder khusus untuk diunggah ke ESP32-C3.

---

#### **Langkah 2: Konversi File untuk ESP32-C3**

ESP32-C3 akan menyimpan file HTML, CSS, dan JavaScript di dalam sistem file (SPIFFS atau LittleFS). Gunakan plugin Arduino IDE untuk mengunggah file ini.

1. **Install Plugin LittleFS**:

   - Jika Anda menggunakan Arduino IDE, install **ESP32 LittleFS Plugin** dari [plugin repository](https://github.com/lorol/arduino-esp32fs-plugin).

2. **Struktur Folder untuk File SPIFFS/LittleFS**:  
   Buat folder `data` di direktori proyek Arduino Anda:

   ```
   esp32-c3-webserver/
   ├── data/          # Folder untuk file website
   │   ├── index.html
   │   ├── styles.css
   │   ├── script.js
   ├── esp32_c3_server.ino
   ```

3. Salin seluruh file dari folder `dist` ke dalam folder `data`.

---

#### **Langkah 3: Kode ESP32-C3 untuk Web Server**

Berikut adalah contoh kode untuk mengatur **ESP32-C3 sebagai server**:

**File: `esp32_c3_server.ino`**

```cpp
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <LittleFS.h>

// Ganti dengan kredensial Wi-Fi Anda
const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";

// Inisialisasi server di port 80
AsyncWebServer server(80);

void setup() {
  // Inisialisasi Serial Monitor
  Serial.begin(115200);

  // Inisialisasi LittleFS
  if (!LittleFS.begin()) {
    Serial.println("LittleFS Mount Failed");
    return;
  }

  // Koneksi ke Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());

  // Konfigurasi routing file statis
  server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");

  // Mulai server
  server.begin();
}

void loop() {
  // Tidak diperlukan kode loop karena server berjalan secara asinkron
}
```

---

#### **Langkah 4: Upload File ke LittleFS**

1. Buka proyek Anda di Arduino IDE.
2. Pilih board **ESP32-C3 Dev Module** di **Tools > Board**.
3. Pastikan Anda memilih port COM yang sesuai.
4. Klik **Tools > ESP32 LittleFS Data Upload** untuk mengunggah file dari folder `data` ke sistem file ESP32.

---

#### **Langkah 5: Upload Firmware**

1. Compile dan upload kode ke ESP32-C3:
   - Klik tombol **Upload** di Arduino IDE.
2. Setelah upload selesai, buka Serial Monitor untuk melihat alamat IP ESP32.

---

#### **Langkah 6: Akses Website**

1. Hubungkan perangkat ke jaringan Wi-Fi yang sama dengan ESP32-C3.
2. Buka browser, lalu masukkan alamat IP ESP32-C3 (misalnya: `http://192.168.1.100`).
3. Aplikasi web Anda akan ditampilkan.

---

#### **Catatan**

- Jika Anda ingin ESP32-C3 berfungsi sebagai **Access Point**, tambahkan kode berikut pada bagian `setup()`:
  ```cpp
  WiFi.softAP("ESP32-C3-AccessPoint", "password123");
  IPAddress IP = WiFi.softAPIP();
  Serial.println(IP);
  ```
  Gunakan IP yang ditampilkan pada Serial Monitor untuk mengakses server.
