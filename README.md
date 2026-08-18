<div align="center">

# 🏛️ BMC — Business and Management Club
### IIITDM Jabalpur

**The Official Website of the Business and Management Club**

A premium, cinematic website built for the Business and Management Club (BMC) of IIITDM Jabalpur — inspired by Awards-grade design, startup landing pages, and modern motion aesthetics.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://bmc-website-nu.vercel.app)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](./LICENSE)

[Live Website](https://bmc-website-nu.vercel.app) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## 📖 About The Project

This repository contains the source code for the official **BMC website** — a collaborative project built and maintained by club members to showcase events, manage club activities, and give BMC a professional, cinematic online presence.

The site is designed around a modern, futuristic aesthetic with smooth motion, glass UI elements, and an auto-loading media system so non-technical members can update content without touching code.

---

## ✨ Features

- 🎬 Premium cinematic UI with reveal-on-scroll animations
- 🧊 Glassmorphism navigation bar
- 🖥️ Fullscreen hero section with background video
- 🖼️ Dynamic, auto-loading image gallery
- 📅 Upcoming Events section (auto-updating)
- 🎞️ Smooth transitions and scroll-based motion design
- 📱 Fully responsive across desktop, tablet, and mobile
- ⚡ Vite-powered frontend for fast dev/build times
- 🧩 Modular, reusable JavaScript architecture

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Markup |
| **CSS3** | Styling & layout |
| **JavaScript (ES Modules)** | Interactivity & dynamic rendering |
| **Vite** (`^8.0.14`) | Build tool & dev server |
| `import.meta.glob` | Dynamic asset loading (gallery/events) |

---

## 📁 Project Structure

```bash
src/
│
├── assets/
│   ├── photos/
│   ├── upcomingevents/
│   ├── video.mp4
│   ├── video2.mp4
│   ├── video3.mp4
│   └── logo.png
│
├── js/
│   ├── main.js
│   ├── gallery.js
│   ├── events.js
│   ├── cursor.js
│   ├── scroll.js
│   └── reveal.js
│
├── styles/
│   ├── navbar.css
│   ├── hero.css
│   ├── gallery.css
│   ├── about.css
│   ├── work.css
│   └── ...
│
└── index.html
```

---


## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js)

### 1. Clone the repository
```bash
git clone https://github.com/Elevate-Business-and-Management-Club/BMC-Website.git
cd BMC-Website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

### 5. Preview the production build
```bash
npm run preview
```

---

## 🖼️ Adding Content (No Code Required)

### Gallery Photos
Drop images into:

src/assets/upcomingevents/

Supported formats: `.jpg` `.jpeg` `.png` `.webp`
The Upcoming Events section updates automatically.

---

## ⚙️ Dynamic Systems

- Auto-loading gallery via `import.meta.glob`
- Dynamic event image rendering
- Modular JS architecture (`gallery.js`, `events.js`, `cursor.js`, `scroll.js`, `reveal.js`)
- Reusable scroll-reveal animation system

---

## 📱 Responsive Design

Optimized and tested across:
- 🖥️ Desktop
- 📱 Tablets
- 📱 Mobile devices

---

## ⚡ Performance Notes

For the best load times:
- Compress videos before uploading (H.264, target < 5–10MB where possible)
- Optimize/resize large images before adding to `assets/`
- Prefer `.webp` over `.jpg`/`.png` when possible

---

## 🤝 Contributing

Contributions are welcome from club members!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add: your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ by the **Business and Management Club, IIITDM Jabalpur**

</div>
