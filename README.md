# FELLOWTOWN

> **Furnished city apartments with hotel service for a night, a week, or a year.**  
> Kinetic Neo-Brutalist architectural hospitality inspired by Ahmedabad modernist forms (BV Doshi, raw lime plaster, sun-cast shadows).

---

## Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Custom architectural color tokens & fluid clamp typography)
- **3D Graphics:** Three.js / WebGL (Orthographic facade elevation with real-time sun-dial directional lighting)
- **Animations:** GSAP 3 + ScrollTrigger + Lenis smooth scrolling (`gsap.matchMedia` for full responsive touch adaptation)
- **Icons:** Lucide React

---

## Getting Started

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## Deploying to GitHub Pages

This project is pre-configured for **GitHub Pages** deployment with two flexible options:

### Option A: Automatic Deployment via GitHub Actions (Recommended)
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit for Fellowtown"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically build and deploy the site via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

### Option B: Manual 1-Command Deployment via `gh-pages`
1. Ensure your remote origin is set:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   ```
2. Run:
   ```bash
   npm run deploy
   ```
3. In your GitHub repository **Settings** &rarr; **Pages**, select **Deploy from a branch** and choose the `gh-pages` branch.

---

## Key Configurations for GitHub Pages
- **Relative Base Path:** Configured in `vite.config.ts` (`base: process.env.VITE_BASE_PATH || './'`) so assets load correctly on project sub-paths, custom domains, or root domains.
- **`.nojekyll` Support:** Located in `public/.nojekyll` to bypass Jekyll processing on GitHub Pages.
- **SPA Fallback Routing:** Automatic `postbuild` script generates `dist/404.html` so direct URLs and refreshes load without 404 errors.
