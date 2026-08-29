# Rockybco — Website README

> Brand Identity & Web Design portfolio for Rockybco. This document covers what is currently placeholder, how to replace it, and how to deploy to production.

---

## 1. Project Overview

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, featured work (6 projects), services, testimonials, FAQ, Let's Work, footer |
| `work.html` | Portfolio — filterable grid (15 projects), case study modal, video lightbox |
| `about.html` | About — bio, skills |
| `brief.html` | Client Brief — 6-step form (Netlify Forms) |
| `contact.html` | Redirect → `brief.html` |
| `success.html` | Post-brief success state |
| `css/style.css` | Global styles (teal `#013E37` / cream `#FFEFB3`) |
| `css/portfolio.css` | Portfolio grid + filter + modal styles |
| `css/about.css` / `css/brief.css` | Page-specific styles |
| `js/nav.js` | Hamburger + scroll reveal |
| `js/portfolio.js` | Filtering + case study / video modals (`js/portfolio.js:5-24` and `js/portfolio.js:159-241`) |
| `brief.js` | Brief form navigation, validation, file upload |
| `assets/` | All images, videos, PDF (see §3) |

All code is formatted, uses relative paths (`assets/...`), and is deployment-safe for local + Netlify.

---

## 2. Quick Start (Local)

No build step required — static HTML/CSS/JS.

```bash
# Option A: VS Code Live Server
# Right-click index.html → Open with Live Server

# Option B: Python http.server
cd rockybco-updated
python -m http.server 8000
# open http://localhost:8000

# Option C: Node http-server
npx http-server . -p 8000
```

> Do **not** open via `file://` — some features (form `action="success.html"` at `brief.html:60`, video poster) require `http://`.

---

## 3. Asset Structure (Already Correct — Do Not Rename Folders)

The repo already matches the spec exactly. Keep this structure:

```text
assets/
├── image/
│   ├── rockyb.png
│   └── logo-placeholder.svg
├── projects/
│   ├── noor-collection/        # 5 files
│   │   ├── noor-thumbnail.png
│   │   ├── noor-logo.png
│   │   ├── noor-palette.png
│   │   ├── noor-mockup-1.png
│   │   └── noor-mockup-2.png
│   ├── ceeravo/                # same 5-file pattern
│   ├── totetales/              # same
│   ├── echoes-of-campus/       # same
│   ├── go-move/                # same
│   ├── vogues-by-dehem/        # same
│   ├── logo-concepts/
│   │   ├── acceleration/       # 2 files: thumbnail + logo
│   │   ├── zuribites/          # 2 files
│   │   ├── aisha-hijab-haven/  # 2 files
│   │   └── oytto-culture/      # 2 files
│   └── website/
│       ├── vogues-by-dehem/    # 3 files: thumbnail, mockup-1, mockup-2
│       ├── ayokunmi/           # 3 files
│       └── brave-nexus/        # 3 files
├── web3/
│   ├── beekeeper.mp4
│   └── denshi.mp4
└── pdf/
    └── rockybco-portfolio-cv.pdf
```

**Rules**
- `image/` → profile/brand only
- `projects/` → all portfolio visuals, grouped by project
- `projects/logo-concepts/` → Logo Concept projects only
- `projects/website/` → Website projects only
- `web3/` → Web3/video assets only
- `pdf/` → CV/portfolio PDF
- Use relative paths: `assets/...` (never `C:\Users\...`)

---

## 4. Placeholder Replacements — What to Replace

Every placeholder is currently **11 bytes** (images) / **5 bytes** (videos) / **21 bytes** (PDF) / `240 bytes` (`logo-placeholder.svg` is real). Replace each with the final export, keeping the **exact filename**.

### 4.1 Profile & Brand

| Path | Current | Replace With | Spec |
|------|---------|--------------|------|
| `assets/image/rockyb.png` | 11 bytes placeholder | Final portrait (transparent or studio shot) | `index.html:637` hero + `index.html:650` bio + `about.html:32` — 400×520 hero, 350×450 bio; PNG/WebP, optimized |
| `assets/image/logo-placeholder.svg` | 240 bytes (real) | Keep or replace with final SVG logo if available | Referenced as fallback in header |

### 4.2 Brand Identity (6 projects × 5 files = 30 files)

For each of: `noor-collection`, `ceeravo`, `totetales`, `echoes-of-campus`, `go-move`, `vogues-by-dehem`

| File | Usage | Spec |
|------|-------|------|
| `*-thumbnail.png` | Grid card in `work.html:27-57` and `index.html:658-666` | 800×500 (16:10), PNG/WebP, < 300KB |
| `*-logo.png` | Modal (left column) via `js/portfolio.js:34` | Transparent PNG, < 200KB |
| `*-palette.png` | Not currently rendered — keep for archive | Any size |
| `*-mockup-1.png` | Modal visuals `js/portfolio.js:33` | 1200×900, < 500KB |
| `*-mockup-2.png` | Modal visuals | Same |

### 4.3 Logo Concepts (4 projects × 2 files = 8 files)

For each of: `acceleration`, `zuribites`, `aisha-hijab-haven`, `oytto-culture`

| File | Usage | Spec |
|------|-------|------|
| `*-thumbnail.png` | Grid `work.html:63-81`; modal `js/portfolio.js:87-114` | 800×500, < 300KB |
| `*-logo.png` | Modal logo | Transparent PNG |

### 4.4 Websites (3 projects × 3 files = 9 files)

For each of: `vogues-by-dehem`, `ayokunmi`, `brave-nexus`

| File | Usage | Spec |
|------|-------|------|
| `thumbnail.png` | Grid `work.html:87-99`; featured `index.html:670` | 800×500, screenshot of live site |
| `mockup-1.png` | Modal `js/portfolio.js:118-141` + `index.html:881-905` | 1280×800, < 500KB |
| `mockup-2.png` | Modal | Same |

**Live URLs** (update in `js/portfolio.js:122-140` and `index.html:924` if they change):
- `Vogues by Dehem Website` → `https://funny-pavlova-17aaef.netlify.app`
- `Brave Nexus` → `https://olusola-oyeyiola.netlify.app/`
- `Ayokunmi` → `https://olotuayokunmi.netlify.app/`
The modal button `View Live Website` (`js/portfolio.js:184`) reads `liveUrl` and opens `target="_blank"`.

### 4.5 Web3 / Video (2 files)

| Path | Current | Replace With | Spec |
|------|---------|--------------|------|
| `assets/web3/beekeeper.mp4` | 5 bytes placeholder | Final animated case study | `work.html:105` (`<video src="assets/web3/beekeeper.mp4">`) + `js/portfolio.js:148` lightbox; H.264 MP4, 1080p, < 15MB, `muted playsinline` |
| `assets/web3/denshi.mp4` | 5 bytes placeholder | Same | `work.html:111` + `js/portfolio.js:154` |

Thumbnails are the videos themselves (no separate PNG needed) — the grid uses `<video>` with play-icon overlay (`css/portfolio.css:114-126`).

### 4.6 PDF

| Path | Current | Replace With | Spec |
|------|---------|--------------|------|
| `assets/pdf/rockybco-portfolio-cv.pdf` | 21 bytes placeholder | Final portfolio + CV | Linked from `index.html:821,840`, `work.html:134`, `about.html:76`, `brief.html:367`; button `Download My Portfolio & CV` with `download` attribute |

### How to Replace

1. Export at correct dimensions (see tables)
2. Optimize (e.g., TinyPNG, Squoosh) — keep under limits above
3. **Overwrite** the existing file — keep the exact filename (case-sensitive)
4. Do not create new folders or rename files — code references are already wired to these exact paths
5. Refresh browser (hard reload `Ctrl+Shift+R`)

> After replacement, all `assets/...` references were verified to resolve (`index.html`, `work.html`, `js/portfolio.js` — 62 references checked). No code change needed after swapping files.

---

## 5. Deployment Ways

### Option A: Netlify — Git Connected (Recommended)

1. Push repo to GitHub/GitLab/Bitbucket
2. Netlify → `Add new site` → `Import an existing project` → connect repo
3. Build settings: **Build command:** *(empty)* — **Publish directory:** `rockybco-updated` (or repo root if this is the root)
4. Deploy — Netlify will detect `brief.html` Netlify Forms automatically (`brief.html:57` has `data-netlify="true"`)
5. Forms: Netlify Dashboard → Forms → verify `rockybco-client-brief` appears after first submission

### Option B: Netlify — Drag & Drop (Quick Test)

1. Netlify → `Add new site` → `Deploy manually`
2. Drag the `rockybco-updated` folder (or zip) onto the drop zone
3. Done — no build step; forms still work if `data-netlify` is present on next Git deploy, but manual deploys need re-upload after each change

### Option C: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
cd rockybco-updated
netlify init        # link to site (or netlify sites:create)
netlify deploy      # preview
netlify deploy --prod
```

### Option D: Other Static Hosts (Vercel, Cloudflare Pages, GitHub Pages)

Same static folder — set publish directory to `rockybco-updated`, no build command. For GitHub Pages, ensure `brief.html` form is changed to a different backend (Netlify Forms only works on Netlify) or keep Netlify for forms.

---

## 6. Next Line of Action to Full Deployment

**Step 1 — Replace visuals (this week)**
- [ ] Export and overwrite all 50 placeholder files (§4)
- [ ] Verify each project folder has correct count (6×5, 4×2, 3×3, 2 videos, 1 PDF)

**Step 2 — Local QA (before pushing)**
- [ ] Run locally via Live Server (`http://localhost:8000`)
- [ ] Portfolio: test each filter (`All`, `Brand Identity`, `Logo Concepts`, `Websites`, `Web3 / Video`) — only correct projects appear (`work.html:24`, `js/portfolio.js:5-24` toggles `display:none` at `css/portfolio.css:65`)
- [ ] Project names/tags/thumbnails match `js/portfolio.js:26-158`
- [ ] Website modals show `View Live Website` → opens correct URL in new tab
- [ ] Web3 cards show video + play icon, lightbox plays `assets/web3/*.mp4`
- [ ] `Start a Project` and `Contact` (nav + mobile nav + hero + services) all link to `brief.html`
- [ ] Brief form: step through 6 steps, try validation, check file upload, submit → lands on `success.html` (`brief.html:60` is now relative)
- [ ] Footer & Let's Work: hierarchy `Email → WhatsApp → LinkedIn` (`index.html:825-831` and all footers), no raw URLs visible, `Download My Portfolio & CV` → `assets/pdf/...` downloads
- [ ] No absolute `C:\` paths, no broken `assets/...` refs

**Step 3 — Push**

```bash
git add .
git commit -m "feat: replace placeholder visuals with final assets"
git push origin main
# Netlify auto-deploys if Git-connected
```

**Step 4 — Post-deploy Verification (on Netlify URL)**
- [ ] Repeat Step 2 checks on live URL
- [ ] Submit one test brief → Netlify Forms dashboard shows submission → email notification arrives
- [ ] Check `success.html` after form POST
- [ ] Open `assets/pdf/rockybco-portfolio-cv.pdf` → downloads
- [ ] Test on mobile (hamburger at `js/nav.js:2-41`, filter bar wraps)

**Step 5 — Go Live**
- [ ] Connect custom domain in Netlify → Domain settings
- [ ] Enable HTTPS (auto)
- [ ] Update `liveUrl` values in `js/portfolio.js` if any website URL changes later (single source of truth)

---

## 7. Notes & Gotchas

- **Do not change design** — colors, typography, spacing are locked (`css/style.css:4-24` variables). Replacing images does not require CSS changes.
- **Filtering fix already applied** — previously used `position:absolute` with inline styles; now uses `display:none` (`css/portfolio.css:65`). No further JS needed.
- **Duplicate code removed** — `js/portfolio.js` had 33 lines of broken duplicate (now 242 lines, `node -c` passes).
- **Formatting already done** — `index.html`/`about.html`/`work.html`/`js/nav.js` were minified (1 line) → now prettified (959/108/150/41 lines).
- **All footers consistent** — `index.html`, `work.html`, `about.html`, `brief.html` all share `Email → WhatsApp → LinkedIn` with official SVG icons.
- If you add a new project: add its `data-category` card in `work.html`, its thumbnail/logo/mockups in correct `assets/...` subfolder, and its entry in `js/portfolio.js:caseData` or `videoData` with matching `category` (`brand-identity` / `logo-concepts` / `website` / `web3`).

---

## 8. Support

- Test locally first (`python -m http.server 8000`)
- If a thumbnail is blank after replacement: check filename case, extension, and that file is not 11 bytes
- If form doesn't submit locally: it's expected to POST to `success.html` — Netlify Forms handling only activates after deploy
- For help: check browser console (F12) for 404s on `assets/...` — all 62 refs are relative and should resolve both locally and on Netlify
