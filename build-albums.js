const fs = require('fs');
const path = require('path');

const albums = JSON.parse(fs.readFileSync('data/album.json', 'utf-8'));

const outDir = path.join('albums');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

for (const album of albums) {
  const slug = album.id;
  const dir = path.join(outDir, slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const tracks = album.tracks.map((t, i) => {
    const isFav = t.title.startsWith('SR ');
    const title = isFav ? t.title.slice(3) : t.title;
    return `<tr>
      <td class="track-num">${i + 1}</td>
      <td class="track-title">${isFav ? '★ ' : ''}${title}</td>
      <td class="track-dur">${t.duration}</td>
    </tr>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
  <link rel="manifest" href="/icons/site.webmanifest">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${album.title} – ${album.artist} (${album.year}) | SnoFolk.Space</title>
  <meta name="description" content="${album.artist} – ${album.title} (${album.year}). ${album.genre}. Full tracklist and download on SnoFolk.Space.">
  <meta property="og:type" content="music.album">
  <meta property="og:title" content="${album.title} – ${album.artist} (${album.year})">
  <meta property="og:description" content="${album.genre} · ${album.city} · ${album.label}">
  <meta property="og:url" content="https://snofolk.space/albums/${slug}">
  <meta property="og:image" content="https://snofolk.space/${album.img}">
  <link rel="canonical" href="https://snofolk.space/albums/${slug}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": "${album.title}",
    "byArtist": { "@type": "MusicGroup", "name": "${album.artist}" },
    "datePublished": "${album.year}",
    "genre": "${album.genre}",
    "recordLabel": "${album.label}",
    "image": "https://snofolk.space/${album.img}",
    "url": "https://snofolk.space/albums/${slug}"
  }
  </script>
</head>
<body>
  <header>
    <h1>SnoFolk.Space</h1>
    <nav>
      <a href="/">Homepage</a>
      <a href="/downloads.html"><strong>Downloads</strong></a>
      <a href="/news.html">News</a>
      <a href="/info.html">Info</a>
    </nav>
  </header>
  <main id="album-page">
    <div id="album-detail" class="album-static">
      <div class="album-cover">
        <img src="/${album.img}" alt="${album.title} – ${album.artist}" loading="lazy">
      </div>
      <div class="album-info">
        <h2 class="album-title">${album.title}</h2>
        <p class="album-artist">${album.artist}</p>
        <ul class="album-meta">
          <li><span>Year</span> ${album.year}</li>
          <li><span>Genre</span> ${album.genre}</li>
          <li><span>City</span> ${album.city}</li>
          <li><span>Label</span> ${album.label}</li>
        </ul>
        <a class="download-btn" href="${album.download}" target="_blank" rel="noopener">Download</a>
      </div>
      <div class="album-tracklist">
        <h3>Tracklist</h3>
        <table>
          <tbody>
            ${tracks}
          </tbody>
        </table>
      </div>
    </div>
  </main>
  <footer>
    <p>© SnoFolk. All rights reserved.</p>
  </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log(`Built: albums/${slug}/index.html`);
}

console.log(`\nDone. ${albums.length} pages generated.`);