// 1. ПУТЬ К ДАННЫМ
const DATA_URL = '/data/album.json';

// 2. ГЛАВНАЯ ФУНКЦИЯ (ЗАПУСК)
async function init() {
    const albums = await fetchAlbums();
    if (albums.length === 0) return;

    renderCollectionVersions();     // Версии коллекции
    renderDownloadsGrid(albums);    // Сетка альбомов на downloads.html
    renderAlbumDetail(albums);      // Страница конкретного альбома album.html
    renderNewAlbums(albums);        // Секция "Новинки" на главной странице
    renderSimpleList(albums);       // Простой список (если используется)
    highlightActiveNav();           // Подсветка активного пункта меню
}

// 3. ЗАГРУЗКА JSON
async function fetchAlbums() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Loading error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Critical error loading albums:", error);
        return [];
    }
}

// 4. СТРАНИЦА КОНКРЕТНОГО АЛЬБОМА (album.html)
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

    // === SEO & META ===
    document.title = `${album.artist} - ${album.title} (${album.year}) | snofolk.space`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute("content",
            `Listen to ${album.title} by ${album.artist} (${album.year}). Genre: ${album.genre}. City: ${album.city}. Download on snofolk.space.`
        );
    }

    injectAlbumSchema(album);

    // Prepare download link
    let downloadUrl = '';
    if (album.download) {
        const fileId = album.download.match(/[-\w]{25,}/)?.[0];
        downloadUrl = fileId
            ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`
            : album.download;
    }

    // Основной HTML альбома
    albumDetail.innerHTML = `
        <div class="album-detail-wrap">
            <div class="album-cover-col">
                <img src="${album.img}" alt="${album.artist} - ${album.title}" class="album-cover-big" loading="lazy">
                
                ${downloadUrl
                    ? `<a href="${downloadUrl}" class="download-btn download-btn-cover" download>
                            Download Album (.rar)
                       </a>
                       <p class="download-hint">If Google shows a warning — click "Download anyway"</p>`
                    : `<p class="no-download">Download link coming soon</p>`
                }
            </div>

            <div class="album-info-col">
                <h2 class="album-title">${album.title}</h2>
                <p class="album-artist">${album.artist}</p>
                
                <ul class="album-meta">
                    <li><span>Year</span>${album.year}</li>
                    <li><span>Genre</span>${album.genre}</li>
                    <li><span>City</span>${album.city}</li>
                    <li><span>Label</span>${album.label || '—'}</li>
                </ul>

                <div class="tracklist">
                    <h3>Tracklist</h3>
                    <ol>${album.tracks.map(t => `<li>${t}</li>`).join("")}</ol>
                </div>
            </div>
        </div>
    `;
}

// 5. SEO: Schema.org JSON-LD
function injectAlbumSchema(album) {
    // Remove previous schema if exists
    document.getElementById('album-schema')?.remove();

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
        "numTracks": album.tracks.length,
        "track": album.tracks.map((track, index) => ({
            "@type": "MusicRecording",
            "position": index + 1,
            "name": track
        }))
    };

    const script = document.createElement('script');
    script.id = 'album-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// 6. СЕТКА АЛЬБОМОВ (downloads.html)
function renderDownloadsGrid(albums) {
    const container = document.getElementById("albums");
    if (!container) return;

    container.innerHTML = "";

    if (albums.length === 0) {
        container.innerHTML = `<p class="no-results">No albums found.</p>`;
        return;
    }

    albums.forEach(album => {
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

// 7. НОВИНКИ НА ГЛАВНОЙ СТРАНИЦЕ
function renderNewAlbums(albums) {
    const container = document.getElementById("new-albums");
    if (!container) return;

    const last5 = albums.slice(-5).reverse();

    container.innerHTML = "";

    last5.forEach(album => {
        const div = document.createElement("div");
        div.className = "album-mini";
        div.innerHTML = `
            <a href="album.html?id=${album.id}">
                <img src="${album.img}" alt="${album.title}" loading="lazy">
            </a>
            <p><strong>${album.artist}</strong><br>${album.title}</p>
        `;
        container.appendChild(div);
    });
}

// 8. ВЕРСИИ КОЛЛЕКЦИИ
function renderCollectionVersions() {
    const container = document.getElementById("old-versions");
    if (!container) return;

    const collectionVersions = [
        {
            version: "v4.2.0",
            date: "March 29, 2026",
            file: "https://drive.google.com/file/d/1PWQM4fC2Rwnbmr6mFG2Chvbk4w3wFXPg/view?usp=drive_link"
        }
    ];

    container.innerHTML = "";

    collectionVersions.forEach(v => {
        const div = document.createElement("div");
        div.className = "version-row";
        div.innerHTML = `
            <span class="version-tag">${v.version}</span>
            <span class="version-date">${v.date}</span>
            <a href="${v.file}" class="download-btn" target="_blank">Download</a>
        `;
        container.appendChild(div);
    });
}

// 9. ПРОСТОЙ СПИСОК (если используется где-то)
function renderSimpleList(albums) {
    const list = document.getElementById("album-list");
    if (!list) return;

    list.innerHTML = "";
    albums.forEach(album => {
        const li = document.createElement("li");
        li.textContent = `${album.artist} — ${album.title} (${album.year})`;
        list.appendChild(li);
    });
}

// 10. ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ
function highlightActiveNav() {
    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && location.pathname.includes(href.replace(/^\.\//, '').replace(/^\//, ''))) {
            link.classList.add("active");
        }
    });
}

// ЗАПУСК СКРИПТА
init();
