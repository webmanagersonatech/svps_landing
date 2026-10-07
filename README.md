# SVPS Landing – Fixed

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Production build (live)
    npm run build
    npm start

## What was fixed
1. Added `next.config.js` – allows external images (Unsplash, Magnific, sonavalliappapublicschool.com) in next/image. Missing config was why images did not show.
2. Renamed `public/acadamics/Experiential-Hands‑On.webp` (had a hidden special hyphen that breaks on Windows/Linux/zip) to `Experiential-Hands-On.webp` and updated the code.
3. Activities used `/images/activities/...` files that did not exist. Placeholder images were generated there so nothing is broken.
   Replace them with real photos using the SAME file names.
4. Verified: `next build` succeeds, all local image paths exist.
