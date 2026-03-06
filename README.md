# FounderMatch 🚀

A Tinder-style networking platform for startup founders and entrepreneurs. Swipe right to connect with visionary builders, or left to pass.

## Features

- **Login / Register** — toggled single-page form with client-side validation; email + password for login, adds name/title/company for registration
- **Swipe Deck** — drag-to-swipe (mouse + touch) with visual CONNECT/PASS overlays; card depth stack (top 3 visible, offset/scaled); threshold-based commit at ±100 px drag
- **Profile Cards** — tabbed layout (About / Skills / Highlights) per founder; gradient header unique per profile; shows stage, industry, bio, looking-for, achievements
- **Match Modal** — fires probabilistically on right-swipe with confetti animation
- **Connections Sidebar** — live list of liked founders; undo last swipe
- **8 Sample Founder Profiles** — spanning AI, CleanTech, HealthTech, Web3, EdTech, AgriTech, Fashion, QuantumTech

## Tech Stack

- **React 19** + **Vite**
- Pure CSS (no UI library) with CSS custom properties
- Fully responsive (mobile + desktop)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

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
