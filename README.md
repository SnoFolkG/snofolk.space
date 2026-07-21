# snofolk.space

![Version](https://img.shields.io/badge/version-5.0.4-red?style=for-the-badge)

SnoFolk.Space is a static archive of classic and rare **Hardcore Punk**, **Horror Punk**, and **Punk Rock** albums.

---

## Project Overview
This repository hosts a small static website built with HTML, CSS and JavaScript. It serves as a curated punk collection with:

- A homepage with archive stats and "I'm Feeling Lucky" navigation.
- A finished album details viewer with tracklists, cover art and download links.
- A downloads page for the full collection.
- News and update history pages.
- An info page with contact details and a sorted album list.

## Files and Structure

### Root files
- `index.html` — Homepage with archive stats, new album highlights, and a random album button.
- `downloads.html` — Collection download page, full archive link and searchable album grid.
- `news.html` — Project news and changelog history.
- `info.html` — Contact info, album list and version history.
- `album.html` — Dynamic album details page rendered from JSON data.
- `what.html` — Access gate page used by the header link flow.
- `404.html` — Error page shown when a page is missing.
- `robots.txt` — Search engine rules.
- `sitemap.xml` — Sitemap for crawlers.
- `_headers` and `_redirects` — Static hosting configuration helpers.

### Assets and scripts
- `css/style.css` — The site styling, dark punk theme, responsive layout and typography.
- `js/script.js` — Collection rendering logic, search, routing, and album detail generation.
- `data/album.json` — Album metadata source for tracklists, downloads and cover art.
- `icons/site.webmanifest` — PWA manifest.
- `icons/` — Site icons and favicons.
- `img/` — Album covers, navigation icons and background assets.

## Data Source
The archive is driven by `data/album.json`. Each album entry includes:

- `id`
- `title`
- `artist`
- `year`
- `genre`
- `city`
- `country`
- `label`
- `bitrate`
- `img`
- `download`
- `tracks`

The JavaScript code loads this JSON and renders:

- album details on `album.html`
- download cards on `downloads.html`
- search and filter functionality
- site statistics and latest additions on `index.html`

## Features
- Dynamic album routing via URL parameters.
- Tracklist rendering with favorite track stars.
- Full collection download page.
- Search by artist, album, year or city.
- Similar album recommendations.
- News and version history updates.
- Custom fonts from Google Fonts (`Montserrat`, `Orbitron`).

---

**Stay Punk. Stay Core.**
