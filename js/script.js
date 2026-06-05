// 1. DATA PATH
const DATA_URL = '/data/album.json';

let allAlbumsData = [];
const WHAT_ACCESS_KEY = 'snofolk-what-access';
const downloadsState = {
    query: '',
    sort: 'artist-asc'
};

// 2. APP START
async function init() {
    initWhatPageAccess();
    if (window.location.pathname.includes('what.html')) {
        const key = 'snofolk-what-access';
        const value = Number(localStorage.getItem(key) || '0');
        const isFresh = Number.isFinite(value) && Date.now() - value < 15000;
        if (!isFresh) {
            window.location.replace('index.html');
            return;
        }
        localStorage.removeItem(key);
    }
    renderNewsTeaser();
    allAlbumsData = await fetchAlbums();
    if (allAlbumsData.length === 0) {
        console.warn("Failed to load albums");
        return;
    }

    renderCollectionVersions();
    renderStats(allAlbumsData);
    highlightActiveNav();

    if (document.getElementById("album-detail")) {
        renderAlbumDetail(allAlbumsData);
    } else {
        renderDownloadsGrid(sortDownloadsAlbums(allAlbumsData));
        renderNewAlbums(allAlbumsData);
        renderSimpleList(allAlbumsData);
        initDownloadsControls(allAlbumsData);
    }

    if (document.getElementById('favorite-albums')) {
        renderFavoriteAlbums(allAlbumsData);
    }
}

function initWhatPageAccess() {
    document.querySelectorAll('.site-title').forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem(WHAT_ACCESS_KEY, String(Date.now()));
        });
    });
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

// 3. LOAD JSON
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

// 3.5 SIMILAR ALBUMS
function findSimilarAlbums(currentAlbum, allAlbums) {
    const others = allAlbums.filter(a => a.id !== currentAlbum.id);

    const sameArtist = shuffleArray(others.filter(a => a.artist === currentAlbum.artist));
    // Берем тот же город, но исключаем того же исполнителя, чтобы не дублировать
    const sameCity = shuffleArray(others.filter(a => a.city === currentAlbum.city && a.artist !== currentAlbum.artist));

    // Объединяем массивы (артисты в приоритете) и забираем первые 3 элемента
    return [...sameArtist, ...sameCity].slice(0, 3);
}


function shuffleArray(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// 3.6 BEST ALBUM BADGE
function isTopAlbum(album) {
    if (!album.tracks || album.tracks.length === 0) return false;
    const starred = album.tracks.filter(t => t.title.startsWith('SR ')).length;
    return starred / album.tracks.length >= 0.5;

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
    const topAlbum = isTopAlbum(album);

    // SEO
    document.title = `${album.artist} - ${album.title} (${album.year}) | snofolk.space`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute("content",
            `Listen to ${album.title} by ${album.artist} (${album.year}). Genre: ${album.genre}. City: ${album.city}.`
        );
    }
    injectAlbumSchema(album);

    // DOWNLOAD
    let downloadHTML = '';
    if (album.download) {
        downloadHTML = `
        <a href="${album.download}" class="download-btn download-btn-cover" download>Download Album (.zip)</a>
    `;
    } else {
        downloadHTML = `<p class="no-download">Download link coming soon</p>`;
    }

    // TRACKLIST
    let tracklistHTML = '';
    if (album.tracks && Array.isArray(album.tracks) && album.tracks.length > 0) {
        const tracksHTML = album.tracks.map((track, index) => {
            const isStarred = track.title.startsWith('SR ');
            const name = track.title.replace(/^SR /, '');
            const duration = track.duration
                ? `<span class="track-duration">${track.duration}</span>`
                : '';
            const indexCell = isStarred
                ? `<span class="track-index is-star">&#9733;</span>`
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

    // SIMILAR ALBUMS
    const displayAlbums = similarAlbums.length > 0
    ? similarAlbums
    : shuffleArray(albums.filter(a => a.id !== album.id)).slice(0, 3);


    const similarNote = similarAlbums.length === 0
        ? `<p class="similar-note">No similar albums yet, but here are some good ones:</p>`
        : '';

    const similarCardsHTML = displayAlbums.map(a => `
        <div class="album-mini-card">
            <a href="album.html?id=${a.id}">
                <img src="${a.img}" alt="${a.title}">
               <p><strong>${a.title}</strong><br>
                   ${a.artist}</p>
            </a>
        </div>
    `).join('');

    const similarHTML = (modifierClass) => `
        <div class="similar-albums ${modifierClass}">
            <h3>Similar albums</h3>
            ${similarNote}
            <div class="similar-grid">
                ${similarCardsHTML}
            </div>
        </div>
    `;

    // FINAL RENDER
    albumDetail.innerHTML = `
        <div class="album-detail-wrap">
            <div class="album-cover-col">
                <img src="${album.img}" alt="${album.artist} - ${album.title}" class="album-cover-big">
                ${downloadHTML}
                ${similarHTML('is-desktop')}
            </div>
            <div class="album-info-col">
                <h2 class="album-title ${topAlbum ? 'top-album' : ''}">
                     ${topAlbum ? '<img src="/img/icons/best.png" alt="Best Album" class="medal-icon">' : ''}
                    ${album.title}
                </h2>
                <p class="album-artist">${album.artist}</p>
                <ul class="album-meta">
                    <li><span>Year</span>${album.year}</li>
                    <li><span>Genre</span>${album.genre}</li>
                    <li><span>City</span>${album.city}</li>
                    <li><span>Country</span>${album.country || 'N/A'}</li>
                    <li><span>Label</span>${album.label || 'N/A'}</li>
                </ul>
                ${tracklistHTML}
                ${similarHTML('is-mobile')}
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

// 5. ALBUM GRID
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
            <p>${album.artist} &bull; ${album.year}</p>
          </a>
        `;
        container.appendChild(div);
    });
}

function sortDownloadsAlbums(albums, sort = downloadsState.sort) {
    const direction = sort === 'artist-desc' ? -1 : 1;

    return albums.slice().sort((a, b) => {
        const artistCompare = (a.artist || '').localeCompare(b.artist || '') * direction;
        if (artistCompare !== 0) return artistCompare;

        return (a.title || '').localeCompare(b.title || '') * direction;
    });
}

function getFilteredDownloadsAlbums(albums) {
    const q = downloadsState.query.trim().toLowerCase();
    if (!q) return albums;

    return albums.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q) ||
        String(a.year).includes(q) ||
        (a.city && a.city.toLowerCase().includes(q)) ||
        (a.country && a.country.toLowerCase().includes(q))
    );
}

function updateDownloadsGrid(albums) {
    renderDownloadsGrid(sortDownloadsAlbums(getFilteredDownloadsAlbums(albums)));
}

// 6. NEW ALBUMS
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

// 6.5 LATEST NEWS
async function renderNewsTeaser() {
    const container = document.querySelector(".news-preview");
    if (!container) return;

    try {
        const response = await fetch("news.html");
        if (!response.ok) throw new Error(`NEWS LOADING ERROR: ${response.status}`);

        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const latestNews = Array.from(doc.querySelectorAll(".news")).slice(0, 3);

        if (latestNews.length === 0) return;

        container.innerHTML = latestNews.map(news => {
            const title = news.querySelector("h3")?.textContent?.trim() || "Untitled news";
            const date = getNewsDate(news);
            const summary = getNewsSummary(news);

            return `
                <div class="news-item-preview">
                    ${date ? `<span class="news-date">${date}</span>` : ""}
                    <h3>${escapeHTML(title)}</h3>
                    ${summary ? `<p>${escapeHTML(summary)}</p>` : ""}
                </div>
            `;
        }).join("") + `<a href="news.html" class="all-news-btn">All news &rarr;</a>`;
    } catch (error) {
        console.warn("Could not load latest news teaser:", error);
    }
}

function getNewsDate(news) {
    const dateParagraph = Array.from(news.querySelectorAll("p"))
        .find(p => p.textContent.trim().startsWith("Date:"));

    return dateParagraph
        ? dateParagraph.textContent.replace(/^Date:\s*/i, "").trim()
        : "";
}

function getNewsSummary(news) {
    const firstListItem = news.querySelector("li");
    if (firstListItem) return firstListItem.textContent.trim();

    const summaryParagraph = Array.from(news.querySelectorAll("p"))
        .find(p => !p.textContent.trim().startsWith("Date:"));

    return summaryParagraph ? summaryParagraph.textContent.trim() : "";
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}

// 7. COLLECTION VERSIONS
function renderCollectionVersions() {
    const versionsContainer = document.getElementById("old-versions");
    if (!versionsContainer) return;

    const collectionVersions = [
        { version: "v5.5.0", date: "07.05.2026", file: "https://www.mediafire.com/file/bwpijt88xf8fr0a/Collection_v5_5_0.zip/file" }
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

// 8. SIMPLE LIST
function renderSimpleList(albums) {
    const list = document.getElementById("album-list");
    if (!list) return;

    const sortedAlbums = albums.slice().sort((a, b) =>
        (a.artist || '').localeCompare(b.artist || '') ||
        (a.title || '').localeCompare(b.title || '')
    );

    sortedAlbums.forEach(album => {
        const li = document.createElement("li");
        li.textContent = `${album.artist} - ${album.title} (${album.year})`;
        list.appendChild(li);
    });
}

// 9. ACTIVE NAV HIGHLIGHT
function highlightActiveNav() {
    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && location.pathname.includes(href)) {
            link.classList.add("active");
        }
    });
}

// 10. DOWNLOADS CONTROLS
function initDownloadsControls(albums) {
    const input = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");

    if (!input && !sortSelect) return;

    if (input) {
        input.addEventListener("input", () => {
            downloadsState.query = input.value;
            updateDownloadsGrid(albums);
        });
    }

    if (sortSelect) {
        sortSelect.value = downloadsState.sort;
        sortSelect.addEventListener("change", () => {
            downloadsState.sort = sortSelect.value;
            updateDownloadsGrid(albums);
        });
    }
}

// 11. STATS
function renderStats(albums) {
    const nums = document.querySelectorAll('.stat-number');
    if (!nums.length) return;

    const totalTracks = albums.reduce((sum, a) => sum + (a.tracks?.length || 0), 0);
    const artists = new Set(albums.map(a => a.artist)).size;
    const years = albums.map(a => Number(a.year)).filter(y => !isNaN(y));
    const yearRange = Math.min(...years) + '-' + Math.max(...years);

    nums[0].textContent = totalTracks;
    nums[1].textContent = albums.length;
    nums[2].textContent = artists;
    nums[3].textContent = yearRange;
}

// 12. FAVORITE ALBUMS
function renderFavoriteAlbums(albums) {
    // Edit this array with your favorite album IDs from album.json
    const favoriteIds = [
        'smoke-signals',
        'incorrect-thoughts',
        'cause-for-alarm',
        'the-speed-of-twisted-thought'
    ];

    const favoriteAlbums = albums.filter(album => favoriteIds.includes(album.id));

    const container = document.getElementById('favorite-albums');
    container.innerHTML = favoriteAlbums.map(album => `
        <a class="album-mini-link" href="album.html?id=${album.id}">
            <article class="album-mini">
                <div class="album-mini-cover">
                    <img src="${album.img}" alt="${album.title} cover">
                </div>
                <div class="album-mini-info">
                    <h3 class="album-mini-title">${album.title}</h3>
                    <p class="album-mini-artist">${album.artist}</p>
                </div>
            </article>
        </a>
    `).join('');
}

// START
init();
