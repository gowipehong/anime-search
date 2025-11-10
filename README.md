# Anime Search

A modern anime search application built with React, TypeScript, and Vite. Search and explore detailed information about anime series with a beautiful, animated UI.

## Features

- Real-time debounced search
- Responsive design (mobile, tablet, desktop)
- Paginated search results
- Detailed anime information (synopsis, ratings, studios, genres, trailers)
- Smooth animations and hover effects
- Performance optimized with React.memo and useMemo

## Tech Stack

React 19 • TypeScript • Vite • Redux Toolkit Query • React Router • Tailwind CSS • DaisyUI

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:4000` in your browser.

## 📁 Project Structure

```
src/
├── components/    # AnimeCard, Pagination
├── pages/         # SearchPage, DetailPage
├── hooks/         # useDebounce
└── store/         # Redux store & API
```

## 🔌 API

Uses the [Jikan API](https://jikan.moe/) (Unofficial MyAnimeList API) for anime data.

---

Built with React, TypeScript, and modern web technologies.
