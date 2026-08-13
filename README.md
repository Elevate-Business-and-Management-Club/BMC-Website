# BMC — Business and Management Club
### IIITDM Jabalpur

The Official Website of the Business and Management Club (BMC), IIITDM Jabalpur.

A premium cinematic website built with a modern, futuristic aesthetic inspired by premium Awwwards websites, startup landing pages, and cinematic motion design — designed as a user-friendly platform for showcasing club activities and events.

---

## About The Project

This repository contains the source code for the official BMC website. The project is developed collaboratively by club members.

---

## Features

- Premium cinematic UI
- Glassmorphism navigation bar
- Fullscreen hero section with background video
- Dynamic image galleries
- Upcoming Events section
- Smooth animations and reveal effects
- Fully responsive design (desktop, tablet, and mobile — including small phones)
- Auto-loading gallery system
- Vite-powered frontend architecture

---

## Project Structure
```
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

# Installation & Setup

## 1. Clone the repository

```bash
git clone <repository-url>
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Start development server

```bash
npm run dev
```

---

## 4. Build for production

```bash
npm run build
```

---

# Uploading Gallery Photos

To add photos to the **Gallery Section**:

Push the photos inside:

```bash
src/assets/photos
```

Supported formats:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

The gallery automatically loads all images dynamically.

No HTML editing is required.

---

## Uploading Upcoming Events

To add images/posters for the **Upcoming Events Section**, push the event images inside:

src/assets/upcomingevents

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

The events section automatically updates dynamically. No manual editing required.

---

## Responsive Design

The website is fully responsive across:
- Desktop
- Tablets
- Mobile devices (including small phones, <480px)

Key breakpoints: `900px` (tablet/mobile) and `480px` (small phones).

---

## Dynamic Systems

- Auto-loading gallery system
- Dynamic event image rendering
- Modular JavaScript architecture
- Reusable animation system

---

## Performance Notes

For optimal performance:
- Compress videos before upload
- Optimize large images
- Use WebP format whenever possible

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- Dynamic Asset Loading using `import.meta.glob`

---

## License

This project is licensed under the MIT License.
