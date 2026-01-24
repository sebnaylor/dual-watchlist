# Claude Code Instructions

## Task Master AI Instructions

**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

---

## Project Overview

**Dual Watchlist** - A collaborative movie/TV tracking app where two users share watchlists. Users search TMDB for media, add to personal watchlists, mark as watched, and view analytics with their partner.

**Stack:** Rails + PostgreSQL backend, React + TypeScript frontend via Inertia.js, Tailwind CSS styling, Devise auth, TMDB/OMDB APIs.

---

## Architecture

### Inertia.js Pattern

Controllers render Inertia pages, not ERB. Data flows: Controller → Presenter (formats data) → React component.

```ruby
# Controller
render inertia: 'Media/Show', props: MediaShowPresenter.new(media, current_user).props
```

### Key Directories

- `app/presenters/` - Format data for React (snake_case → camelCase)
- `app/services/` - Business logic (SaveMedia, Ratings)
- `app/javascript/pages/` - Inertia page components (route-mapped)
- `app/javascript/components/` - Reusable React components

### Models (STI for Media)

`Media` base class with `Movie` and `Tv` subclasses. User has one `PersonalWatchlist`, optionally linked to a `SharedWatchlist` with partner.

---

## Adding Features

1. **New page:** Route → Controller → Presenter → React page in `pages/`
2. **New API endpoint:** Route → Controller returning JSON → Axios call from React
3. **New component:** Create in `components/[feature]/`, use TypeScript interfaces

---

## Commands

```bash
./bin/dev              # Start dev servers
bundle exec rspec      # Run tests
rubocop -A             # Auto-fix linting
rails db:migrate       # Run migrations
```

---

## Environment

Required in `.env`: `TMDB_API_KEY`, `OMDB_API_KEY`, `DEVISE_SECRET_KEY`

Optional: AWS S3 credentials (for images), `SENTRY_DSN`

## Styling Conventions

Use Tailwind exclusively. Design tokens are defined in `config/tailwind.config.js`.

**Colors** (use `brand-*` prefix):
- `brand-dark` (#1F1E20) - background
- `brand-purple` (#2c2638) - card backgrounds
- `brand-accent` (#f05542) - highlights, icons
- `brand-primary` (rgb(55 48 163)) - buttons, interactive elements
- `brand-muted` (#b8b7ad) - secondary text

**Sizing** (semantic names):
- `h-media-backdrop` (200px) - backdrop images
- `h-media-hero` (500px) - hero sections
- `w-media-poster` (500px) - poster images

**Utility classes** (in `app/javascript/entrypoints/application.css`):
- `scrollbar-hide` - hide scrollbars cross-browser
- `gradient-overlay` - standard gradient overlay

**Rules:**
- No inline style objects in React components
- No arbitrary Tailwind values (e.g., `h-[500px]`) - add to config if needed
- Use Lucide React for icons with color/size props

---

## Code Style

- Concise, readable and performant
- Only put comments where they are absolutely necessary
- Run code-simplifier on all your written code with the above rules
