# macOS-Inspired Portfolio
<small><em>Album artwork belongs to their respective rights holders and is used only for personal/portfolio demonstration.</em></small>

A personal portfolio that masquerades as a macOS desktop. Instead of a single-page site with a hero and cards, the entire experience is an interactive OS: lock screen, desktop, dock, windows, widgets, and a fake terminal — all built in React, TypeScript, and Motion.

## 🚀 [Live Demo](https://made-human-51828862.figma.site/)

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

## Tutorials and References

These are the main tutorials and resources I went to when I wasn't relying on AI tools.

- macOS UI & Dock Physics
  - macOS dock magnification with Framer Motion concepts – search: "macOS Dock animation with Framer Motion buildui" on YouTube.
  - Framer Motion full course by Codevolution:
      - https://www.youtube.com/watch?v=znbCa4Rr054
- Glassmorphism / Liquid Glass UI
  - “Glassmorphism UI Design in CSS” by Kevin Powell
  - “Frosted Glass Effect with CSS” by Fireship
- Canvas Animations
  - “HTML Canvas Particle Animation” by The Coding Train (Daniel Shiffman):
      - https://www.youtube.com/c/TheCodingTrain
  - Multi-layer sine wave ocean techniques on YouTube. (Also used tons of Desmos for this kill me)
  - HTML5 Canvas Tutorial for Beginners - https://www.youtube.com/watch?v=EO6OkltgudE
- Terminal UI in React
    - Fireship + Jack Harrington's videos on "Building terminals in React"

Overall, this was a slightly long, but fun learning experience. C:

---

## Notes

- This is a personal, non-commercial project that visually references Apple’s macOS design language. It is not affiliated with or endorsed by Apple.
- The contact UI is front-end only; no data is stored or transmitted.
- Some media (e.g., ocean video, album artwork) is used under the respective providers’ terms and is not included for commercial reuse.

---

## Credits

- Built by: Divik Srivastava
- Design Inspo: macOS Monterey / Ventura / Sequoia by Apple Inc. (fan/educational recreation, not affiliated with Apple).
- “Hollow Purple” animation inspired by the technique from Jujutsu Kaisen by Gege Akutami. (chat is this a niche reference)

---

## Libraries

- Motion – https://motion.dev/
- Tailwind CSS – https://tailwindcss.com/
- Radix UI – https://radix-ui.com/
- Vite – https://vitejs.dev/
- React Router – https://reactrouter.com/
- Lucide React – https://lucide.dev/

---

<small><em>thanks for reading<em><small>
