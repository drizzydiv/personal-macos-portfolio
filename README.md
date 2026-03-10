# macOS-Inspired Portfolio

A personal portfolio that masquerades as a macOS desktop. Instead of a single-page site with a hero and cards, the entire experience is an interactive OS: lock screen, desktop, dock, windows, widgets, and a fake terminal — all built in React, TypeScript, and Motion.

## Live Demo

> https://your-demo-url.com

Best experienced on a modern desktop browser (Chrome or Safari). Mobile is supported but some interactions are tuned for pointer + keyboard.

---

## Features

- **macOS-style lock screen** with live clock, animated ocean background (HTML5 Canvas waves with optional video overlay), and smooth unlock transition.  
- **Aurora desktop** rendered on HTML5 Canvas with layered “liquid glass” glow, film grain, and vignette.  
- **Pixel-accurate dock** with physics-based icon magnification using Motion springs and motion values.  
- **Frosted glass windows** with traffic-light controls, Escape-to-close, and animated open/close transitions.  
- **App windows** for:
  - Finder-style “Navigator” board linking to projects  
  - About-me profile (photo, tags, skills, timeline, achievements)  
  - Project deep dives: `broke2broker`, `waqt`, `causality challenge`  
  - Fake terminal with real commands and command history  
  - Photos film strip viewer  
  - “Hollow Purple” animation leading to future projects  
- **Widgets** for music (Drake tracks with artwork-reactive glow) and calendar, plus menu bar status items and live clock.

---

## Tech Stack

- **Framework:** React 18 + TypeScript (Vite 6)  
- **Styling:** Tailwind CSS v4, custom liquid-glass components  
- **Animation:** Motion (Framer Motion) for springs, presence, and layout transitions  
- **Canvas:** Native HTML5 Canvas for waves, aurora, and spacetime diagrams  
- **UI Primitives:** Radix UI  
- **Routing:** React Router v7  

---

## Getting Started

```bash
git clone https://github.com/your-username/macos-portfolio.git
cd macos-portfolio
npm install
npm run dev
