// 1. ПУТЬ К ДАННЫМ
const DATA_URL = '/data/album.json';

// 2. ГЛАВНАЯ ФУНКЦИЯ (ЗАПУСК)
async function init() {
    const albums = await fetchAlbums();
    if (albums.length === 0) return;

    renderCollectionVersions(); // Версии коллекции
    renderDownloadsGrid(albums); // Сетка на странице downloads.html
    renderAlbumDetail(albums);  // Страница конкретного альбома album.html
    renderNewAlbums(albums);    // Секция "Новинки" на главной
    renderSimpleList(albums);   // Простой текстовый список
    highlightActiveNav();       // Подсветка меню
	initSearch(albums); // Поиск
}

// 3. ЗАГРУЗКА JSON
async function fetchAlbums() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Критическая ошибка:", error);
        return [];
    }
}

// 3.5 ПОИСК ПОХОЖИХ АЛЬБОМОВ
function findSimilarAlbums(currentAlbum, allAlbums) {
    const others = allAlbums.filter(a => a.id !== currentAlbum.id);
    
    // 1. Сначала ищем по исполнителю
    const sameArtist = others.filter(a => a.artist === currentAlbum.artist);
    if (sameArtist.length >= 3) {
        return sameArtist.slice(0, 3);
    }
    if (sameArtist.length > 0) {
        return sameArtist; // вернем что есть, если меньше 3
    }
    
    // 2. Если исполнитель один — ищем по городу
    const sameCity = others.filter(a => a.city === currentAlbum.city);
    if (sameCity.length >= 3) {
        return sameCity.slice(0, 3);
    }
    if (sameCity.length > 0) {
        return sameCity;
    }
    
    // 3. Если города нет/совпадений нет — возвращаем пустой массив
    // (это будет сигналом показать сообщение + случайные)
    return [];
}

// 4. ALBUM DETAIL PAGE (album.html)
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

    // Находим похожие альбомы
    const similarAlbums = findSimilarAlbums(album, albums);

    // --- SEO & META DATA START ---
    // 1. Update Title
    document.title = `${album.artist} - ${album.title} (${album.year}) | snofolk.space`;

    // 2. Update Description Meta Tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute("content", `Listen to ${album.title} by ${album.artist} (${album.year}). Genre: ${album.genre}. City: ${album.city}. Explore the full tracklist and download on snofolk.space.`);
    }

    // 3. Inject Schema.org JSON-LD (For Google "Rich Results")
    injectAlbumSchema(album);
    // --- SEO & META DATA END ---

    let downloadUrl = '';
    if (album.download) {
        const fileId = album.download.match(/[-\w]{25,}/)?.[0];
        downloadUrl = fileId 
            ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`
            : album.download;
    }

    // Формируем HTML для похожих альбомов
    let similarHTML = '';
    if (similarAlbums.length === 0) {
        // Случайные 3 альбома
        const randomAlbums = albums
            .filter(a => a.id !== album.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        
        similarHTML = `
          <div class="similar-albums">
            <h3>Похожие альбомы</h3>
            <p class="similar-note">Пока похожих нет, но у меня есть другие хорошие альбомы</p>
            <div class="similar-grid">
              ${randomAlbums.map(a => `
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
    } else {
        similarHTML = `
          <div class="similar-albums">
            <h3>Похожие альбомы</h3>
            <div class="similar-grid">
              ${similarAlbums.map(a => `
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
    }

    albumDetail.innerHTML = `
      <div class="album-detail-wrap">
        <div class="album-cover-col">
          <img src="${album.img}" alt="${album.artist} - ${album.title}" class="album-cover-big">
          ${downloadUrl 
            ? `<a href="${downloadUrl}" class="download-btn download-btn-cover" download>Download Album (.rar)</a>
               <p class="download-hint">If Google shows a warning — click "Download anyway"</p>`
            : `<p class="no-download">Download link coming soon</p>`
          }
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
          <div class="tracklist">
            <h3>Tracklist</h3>
            <ol>${album.tracks.map(t => `<li>${t}</li>`).join("")}</ol>
          </div>
        </div>
      </div>
    `;
}

// NEW HELPER FUNCTION FOR SEO
function injectAlbumSchema(album) {
    // Remove existing schema if any (to avoid duplicates when navigating)
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
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}
// 5. ОБНОВЛЕННАЯ СЕТКА АЛЬБОМОВ (с очисткой контейнера)
function renderDownloadsGrid(albumsToRender) {
    const container = document.getElementById("albums");
    if (!container) return;

    // КРИТИЧНО: Очищаем контейнер перед тем, как рисовать отфильтрованные данные
    container.innerHTML = ""; 

    // Если ничего не найдено, можно вывести сообщение
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

// 6. НОВИНКИ (На главной)
function renderNewAlbums(albums) {
    const container = document.getElementById("new-albums");
    if (!container) return;

    const last5 = albums.slice(-5).reverse(); // Последние 5, сначала новые
    last5.forEach(album => {
        const div = document.createElement("div");
        div.className = "album-mini";
div.innerHTML = `
  <a href="album.html?id=${album.id}" style="display:block; width:120px; height:120px; overflow:hidden;">
    <img src="${album.img}" alt="${album.title}" style="width:120px; height:120px; object-fit:cover;">
  </a>
  <p><strong>${album.artist}</strong><br>${album.title}</p>
`;
    });
}

// 7. ВЕРСИИ КОЛЛЕКЦИИ (about.html / index.html)
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

// 8. ПРОСТОЙ СПИСОК (если нужен)
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

// ЗАПУСК
init();