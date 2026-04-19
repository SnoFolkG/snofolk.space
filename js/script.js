// 1. ПУТЬ К ДАННЫМ
const DATA_URL = '/data/album.json';

let allAlbumsData = [];

// 2. ЗАПУСК
async function init() {
    allAlbumsData = await fetchAlbums();
    if (allAlbumsData.length === 0) {
        console.warn("Не удалось загрузить альбомы");
        return;
    }

    renderCollectionVersions();
    highlightActiveNav();

    if (document.getElementById("album-detail")) {
        renderAlbumDetail(allAlbumsData);
    } else {
        renderDownloadsGrid(allAlbumsData);
        renderNewAlbums(allAlbumsData);
        renderSimpleList(allAlbumsData);
        initSearch(allAlbumsData);
    }
}

// LUCKY BUTTON
function getRandomAlbum() {
    if (allAlbumsData.length > 0) {
        const randomIndex = Math.floor(Math.random() * allAlbumsData.length);
        window.location.href = `album.html?id=${allAlbumsData[randomIndex].id}`;
    } else {
        window.location.href = 'downloads.html';
    }
}

// 3. ЗАГРУЗКА JSON
async function fetchAlbums() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`LOADING ERROR: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("CRITICAL ERROR:", error);
        return [];
    }
}

// 3.5 ПОХОЖИЕ АЛЬБОМЫ
function findSimilarAlbums(currentAlbum, allAlbums) {
    const others = allAlbums.filter(a => a.id !== currentAlbum.id);

    const sameArtist = others.filter(a => a.artist === currentAlbum.artist);
    if (sameArtist.length >= 3) return sameArtist.slice(0, 3);
    if (sameArtist.length > 0) return sameArtist;

    const sameCity = others.filter(a => a.city === currentAlbum.city);
    if (sameCity.length >= 3) return sameCity.slice(0, 3);
    if (sameCity.length > 0) return sameCity;

    return [];
}

// 4. ALBUM DETAIL PAGE
function renderAlbumDetail(albums) {
    const albumDetail = document.getElementById("album-detail");
    if (!albumDetail) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const album = albums.find(a => a.id === id);

    if (!album) {
        albumDetail.innerHTML = `<p class="error">Album not found.</p>`;
        return;
    }

    const similarAlbums = findSimilarAlbums(album, albums);

    // SEO
    document.title = `${album.artist} - ${album.title} (${album.year}) | snofolk.space`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute("content",
            `Listen to ${album.title} by ${album.artist} (${album.year}). Genre: ${album.genre}. City: ${album.city}.`
        );
    }
    injectAlbumSchema(album);

    // СКАЧИВАНИЕ
    let downloadHTML = '';
    if (album.download) {
        const fileId = album.download.match(/[-\w]{25,}/)?.[0];
        const downloadUrl = fileId
            ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`
            : album.download;
        downloadHTML = `
            <a href="${downloadUrl}" class="download-btn download-btn-cover" download>Download Album (.rar)</a>
            <p class="download-hint">If Google shows a warning — click "Download anyway"</p>
        `;
    } else {
        downloadHTML = `<p class="no-download">Download link coming soon</p>`;
    }

    // ТРЕКЛИСТ
    let tracklistHTML = '';
    if (album.tracks && Array.isArray(album.tracks) && album.tracks.length > 0) {
        const tracksHTML = album.tracks.map((track, index) => {
            const isStarred = track.title.startsWith('SR ');
            const name = track.title.replace(/^SR /, '');
            const duration = track.duration
                ? `<span class="track-duration">${track.duration}</span>`
                : '';
            const indexCell = isStarred
                ? `<span class="track-index is-star">★</span>`
                : `<span class="track-index">${index + 1}.</span>`;

            return `
                <li class="${isStarred ? 'is-star' : ''}">
                    ${indexCell}
                    <span class="track-name">${name}</span>
                    ${duration}
                </li>
            `;
        }).join('');

        tracklistHTML = `
            <div class="tracklist">
                <h3>Tracklist</h3>
                <ol>${tracksHTML}</ol>
            </div>
        `;
    } else {
        tracklistHTML = `<p class="no-tracks">Tracklist not available yet.</p>`;
    }

    // ПОХОЖИЕ АЛЬБОМЫ
    const displayAlbums = similarAlbums.length > 0
        ? similarAlbums
        : albums.filter(a => a.id !== album.id).sort(() => 0.5 - Math.random()).slice(0, 3);

    const similarNote = similarAlbums.length === 0
        ? `<p class="similar-note">No similar albums yet, but here are some good ones:</p>`
        : '';

    const similarHTML = `
        <div class="similar-albums">
            <h3>Similar albums</h3>
            ${similarNote}
            <div class="similar-grid">
                ${displayAlbums.map(a => `
                    <div class="album-mini-card">
                        <a href="album.html?id=${a.id}">
                            <img src="${a.img}" alt="${a.title}">
                            <p><strong>${a.artist}</strong><br>${a.title}</p>
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // ФИНАЛЬНЫЙ РЕНДЕР
    albumDetail.innerHTML = `
        <div class="album-detail-wrap">
            <div class="album-cover-col">
                <img src="${album.img}" alt="${album.artist} - ${album.title}" class="album-cover-big">
                ${downloadHTML}
                ${similarHTML}
            </div>
            <div class="album-info-col">
                <h2 class="album-title">${album.title}</h2>
                <p class="album-artist">${album.artist}</p>
                <ul class="album-meta">
                    <li><span>Year</span>${album.year}</li>
                    <li><span>Genre</span>${album.genre}</li>
                    <li><span>City</span>${album.city}</li>
                    <li><span>Label</span>${album.label || 'N/A'}</li>
                </ul>
                ${tracklistHTML}
            </div>
        </div>
    `;
}

// SEO SCHEMA
function injectAlbumSchema(album) {
    const oldSchema = document.getElementById('album-schema');
    if (oldSchema) oldSchema.remove();

    const schema = {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        "name": album.title,
        "byArtist": {
            "@type": "MusicGroup",
            "name": album.artist
        },
        "genre": album.genre,
        "datePublished": album.year.toString(),
        "image": `https://snofolk.space/${album.img}`,
        "numTracks": album.tracks ? album.tracks.length : 0,
        "track": (album.tracks || []).map((track, index) => ({
            "@type": "MusicRecording",
            "position": index + 1,
            "name": track.title || track
        }))
    };

    const script = document.createElement('script');
    script.id = 'album-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
}

// 5. СЕТКА АЛЬБОМОВ
function renderDownloadsGrid(albumsToRender) {
    const container = document.getElementById("albums");
    if (!container) return;

    container.innerHTML = "";

    if (albumsToRender.length === 0) {
        container.innerHTML = `<p class="no-results">No albums found matching your criteria.</p>`;
        return;
    }

    albumsToRender.forEach(album => {
        const div = document.createElement("div");
        div.className = "album";
        div.innerHTML = `
          <a href="album.html?id=${album.id}" class="album-link">
            <img src="${album.img}" alt="${album.title}" loading="lazy">
            <h3>${album.title}</h3>
            <p>${album.artist} • ${album.year}</p>
          </a>
        `;
        container.appendChild(div);
    });
}

// 6. НОВИНКИ
function renderNewAlbums(albums) {
    const container = document.getElementById("new-albums");
    if (!container || !albums || albums.length === 0) return;

    container.innerHTML = "";
    const last4 = albums.slice(-4).reverse();

    last4.forEach(album => {
        const div = document.createElement("div");
        div.className = "album-mini";
        div.innerHTML = `
            <a href="album.html?id=${album.id}" class="album-mini-link">
                <div class="album-mini-cover">
                    <img src="${album.img}" alt="${album.title}" loading="lazy">
                </div>
                <div class="album-mini-info">
                    <p class="album-mini-title">${album.title}</p>
                    <p class="album-mini-artist">${album.artist}</p>
                </div>
            </a>
        `;
        container.appendChild(div);
    });
}

// 7. ВЕРСИИ КОЛЛЕКЦИИ
function renderCollectionVersions() {
    const versionsContainer = document.getElementById("old-versions");
    if (!versionsContainer) return;

    const collectionVersions = [
        { version: "v4.2.0", date: "29.03.2026", file: "https://drive.google.com/file/d/1PWQM4fC2Rwnbmr6mFG2Chvbk4w3wFXPg/view?usp=drive_link" }
    ];

    collectionVersions.forEach(v => {
        const div = document.createElement("div");
        div.className = "version-row";
        div.innerHTML = `
            <span class="version-tag">${v.version}</span>
            <span class="version-date">${v.date}</span>
            <a href="${v.file}" class="download-btn">Download</a>
        `;
        versionsContainer.appendChild(div);
    });
}

// 8. ПРОСТОЙ СПИСОК
function renderSimpleList(albums) {
    const list = document.getElementById("album-list");
    if (!list) return;
    albums.forEach(album => {
        const li = document.createElement("li");
        li.textContent = `${album.artist} — ${album.title} (${album.year})`;
        list.appendChild(li);
    });
}

// 9. ПОДСВЕТКА МЕНЮ
function highlightActiveNav() {
    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && location.pathname.includes(href)) {
            link.classList.add("active");
        }
    });
}

// 10. ПОИСК
function initSearch(albums) {
    const input = document.getElementById("search-input");
    if (!input) return;

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
            renderDownloadsGrid(albums);
            return;
        }
        const filtered = albums.filter(a =>
            a.title.toLowerCase().includes(q) ||
            a.artist.toLowerCase().includes(q) ||
            String(a.year).includes(q) ||
            (a.city && a.city.toLowerCase().includes(q))
        );
        renderDownloadsGrid(filtered);
    });
}

// 11. СТАТИСТИКА
function renderStats(albums) {
    const nums = document.querySelectorAll('.stat-number');
    if (!nums.length) return;

    const totalTracks = albums.reduce((sum, a) => sum + (a.tracks?.length || 0), 0);
    const artists = new Set(albums.map(a => a.artist)).size;
    const years = albums.map(a => a.year);
    const yearRange = Math.min(...years) + '–' + Math.max(...years);

    nums[0].textContent = totalTracks;
    nums[1].textContent = albums.length;
    nums[2].textContent = artists;
    nums[3].textContent = yearRange;
}

// ЗАПУСК
init();