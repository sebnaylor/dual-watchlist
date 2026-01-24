# PRD: Dual Watchlist Codebase Optimization

## Overview
Optimize the Dual Watchlist application across three areas: styling, authentication, and code quality.

## Project Context
Dual Watchlist is a Rails 7 + React/TypeScript app using Inertia.js. Users search TMDB for movies/TV, add to personal watchlists, mark as watched, and share with a partner.

Current tech: Rails backend, PostgreSQL, React frontend via Inertia.js, Tailwind CSS, Devise auth, TMDB/OMDB APIs.

---

## Area 1: Styling System Overhaul

### Current Problems
- Mixed styling approaches: Tailwind classes, inline JS style objects, and CSS files all used inconsistently
- Icons are hardcoded SVGs in app/javascript/components/shared/icons.tsx with no color props (all use fill="white" or hardcoded hex)
- No design tokens - colors scattered: #1F1E20, #2c2638, #f05542, rgb(55 48 163)
- Arbitrary Tailwind values (h-[500px], w-[200px]) instead of using design scale
- Scrollbar hiding implemented as inline JS object instead of utility class
- Legacy unused CSS button classes in app/assets/stylesheets/application.css
- react-burger-menu uses separate inline style object

### Requirements
1. Consolidate all styling to Tailwind-first approach
2. Create design tokens in tailwind.config.js for all colors, spacing, and sizing
3. Replace arbitrary values with semantic scale (e.g., h-[500px] → h-media-card)
4. Create reusable utility classes for common patterns (scrollbar-hide, gradient overlays)
5. Remove unused legacy CSS
6. Implement Lucide React icon library (tree-shakeable, 1000+ icons, consistent style)
7. Replace all custom SVG icons with Lucide equivalents, accepting color/size props
8. Document styling conventions in CLAUDE.md

---

## Area 2: Authentication Overhaul

### Current Problems
- Static Rails ERB views for login/signup/password reset (app/views/devise/)
- Password reset pages lack the dark purple theme - inconsistent with rest of app
- Sign out configured as GET request (security concern, should be DELETE)
- React Nav component makes manual fetch to /users/sign_out with CSRF token
- No email confirmation enabled
- No social login options
- Profile image upload on signup but limited validation feedback

### Requirements
1. Replace Devise ERB views with React/Inertia pages for consistent UX
2. Evaluate auth service options:
   - Option A: Keep Devise but convert views to Inertia React pages
   - Option B: Firebase Auth (social login, email verification built-in)
   - Option C: Clerk or Auth0 (managed auth with React components)
3. Implement proper sign out (DELETE request or auth service method)
4. Add email verification flow
5. Add social login (Google at minimum)
6. Improve form validation with inline feedback
7. Ensure mobile-responsive auth pages
8. Add "magic link" passwordless option if using modern auth service

---

## Area 3: Code Refactoring

### Current Problems

#### React/TypeScript Issues
- Axios calls duplicated in 3+ components with identical CSRF header setup (MediaShow, Analytics, Search)
- window.location.reload() used 3 times in MediaShow instead of state updates
- console.log left in production code (MediaShow.tsx line 87)
- Watchlist.tsx repeats identical JSX structure 3 times for Movies/TV sections
- TypeScript interfaces are massive and not broken into reusable types
- No centralized API client or error handling

#### Rails Issues
- Typo: "waatchlist_partner_initials" in MediaShowPresenter line 76
- Dead code: AddToWatchlist service is completely stubbed out
- Duplicated media_item mapping logic in HomeIndexPresenter and AnalyticsPresenter
- Magic strings for media types ('Movie', 'Tv') repeated everywhere
- Inconsistent error handling across controllers
- N+1 query risk in MediaShowPresenter line 87

#### General Issues
- No centralized constants for URLs, media types, or API paths
- Rails blob path generation duplicated in 3 locations
- TMDB base URL construction repeated in SaveMedia and SearchResponsePresenter

### Requirements
1. Create centralized axios client with:
   - Automatic CSRF token injection
   - Consistent error handling
   - TypeScript response types
2. Replace window.location.reload() with proper state management
3. Remove all console.logs from production code
4. Extract reusable components:
   - MediaSection for watchlist (replaces 3x repeated JSX)
   - MediaCard for search results
5. Create shared TypeScript types file (types/media.ts, types/user.ts)
6. Fix typo in MediaShowPresenter
7. Remove or implement AddToWatchlist service
8. Extract shared presenter logic to module/concern
9. Create constants file for:
   - Media types enum
   - API endpoints
   - TMDB base URL
10. Add eager loading to prevent N+1 queries
11. Standardize error handling pattern across all controllers
12. Add error logging

---

## Success Criteria
- All styling uses Tailwind with design tokens (no inline style objects)
- Icons are from a single library with consistent API
- Auth pages are React components with modern UX
- Social login available
- No duplicated code patterns
- All axios calls go through centralized client
- TypeScript types are reusable and well-organized
- No console.logs in production
- Error handling is consistent
- Code is readable without excessive comments

## Out of Scope
- New features (just optimization)
- Database schema changes
- API changes (except auth if switching providers)
- Test coverage (separate initiative)
