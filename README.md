# FounderMatch 🚀

A Tinder-style networking platform for startup founders and entrepreneurs. Swipe right to connect with visionary builders, or left to pass.

![FounderMatch Login](https://github.com/user-attachments/assets/f029d380-2392-40ad-b3ee-0396d6ec5e5e)

## Features

- **Login / Register** — toggled single-page form with client-side validation; email + password for login, adds name/title/company for registration
- **Swipe Deck** — drag-to-swipe (mouse + touch) with visual CONNECT/PASS overlays; card depth stack (top 3 visible, offset/scaled); threshold-based commit at ±100 px drag
- **Profile Cards** — tabbed layout (About / Skills / Highlights) per founder; gradient header unique per profile; shows stage, industry, bio, looking-for, achievements
- **Match Modal** — fires probabilistically on right-swipe with confetti animation
- **Connections Sidebar** — live list of liked founders; undo last swipe
- **8 Sample Founder Profiles** — spanning AI, CleanTech, HealthTech, Web3, EdTech, AgriTech, Fashion, QuantumTech

## Tech Stack

- **React 19** + **Vite 7**
- Pure CSS (no UI library) with CSS custom properties
- Fully responsive (mobile + desktop)

## Prerequisites

- **Node.js** ≥ 18 — download from [nodejs.org](https://nodejs.org/) or install via a version manager like [nvm](https://github.com/nvm-sh/nvm)
- **npm** (bundled with Node.js)

Verify your installation:

```bash
node --version   # should print v18 or higher
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rohan-m2004/Founders-Dating.git
cd Founders-Dating
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

This launches a local Vite dev server with hot-module replacement. Once it starts you will see output like:

```
VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173/** in your browser to use the app.

### 4. Build for production

```bash
npm run build
```

The optimized output is written to the `dist/` directory. You can preview the production build locally:

```bash
npm run preview
```

### 5. Lint

```bash
npm run lint
```

## Available Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start Vite dev server with hot reload             |
| `npm run build`   | Create an optimized production build in `dist/`   |
| `npm run preview` | Serve the production build locally for testing    |
| `npm run lint`    | Run ESLint across the project                     |

## Project Structure

```
src/
  App.jsx                  # Login ↔ SwipePage state gate
  data/founders.js         # Static founder seed data
  components/
    LoginPage.jsx/.css     # Login & registration form
    SwipePage.jsx/.css     # Swipe logic, action buttons, sidebar
    ProfileCard.jsx/.css   # Drag mechanics + tabbed content
    MatchModal.jsx/.css    # Match celebration modal
```

Drag state is tracked via a `useRef` (avoids re-renders mid-drag); swipe direction is resolved on `mouseup` / `touchend`.
