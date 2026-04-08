// 1. ПУТЬ К ДАННЫМ
const DATA_URL = '/data/album.json';

// 2. ГЛАВНАЯ ФУНКЦИЯ (ЗАПУСК)
async function init() {
    const albums = await fetchAlbums();
    if (albums.length === 0) return;

    renderCollectionVersions(); // Версии коллекции
    initSorting(albums);        // Сортировка на downloads.html
    renderAlbumDetail(albums);  // Страница конкретного альбома album.html
    renderNewAlbums(albums);    // Секция "Новинки" на главной
    renderSimpleList(albums);   // Простой текстовый список
    highlightActiveNav();       // Подсветка меню
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

// 4. СТРАНИЦА АЛЬБОМА (album.html)
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

    document.title = `${album.title} – snofolk.space`;

    // Формируем прямую ссылку на скачивание
    let downloadUrl = '';
    if (album.download) {
        const fileId = album.download.match(/[-\w]{25,}/)?.[0];
        downloadUrl = fileId 
            ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`
            : album.download;
    }

    albumDetail.innerHTML = `
      <div class="album-detail-wrap">
        <div class="album-cover-col">
          <img src="${album.img}" alt="${album.title}" class="album-cover-big">
          ${downloadUrl 
            ? `<a href="${downloadUrl}" class="download-btn download-btn-cover" download>Download Album (.rar)</a>
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

// 5. ОБНОВЛЕННАЯ СЕТКА АЛЬБОМОВ (с очисткой контейнера)
function renderDownloadsGrid(albumsToRender) {
    const container = document.getElementById("albums");
    if (!container) return;

    container.innerHTML = ""; 

    if (albumsToRender.length === 0) {
        container.innerHTML = `<p class="no-results">No albums found.</p>`;
        return;
    }

    albumsToRender.forEach(album => {
        const div = document.createElement("div");
        div.className = "album";
        div.innerHTML = `
          <a href="/albums/${album.id}" class="album-link">
            <img src="${album.img}" alt="${album.title}" loading="lazy">
            <h3>${album.title}</h3>
            <p>${album.artist} • ${album.year}</p>
          </a>
        `;
        container.appendChild(div);
    });
}

// 6. ИНИЦИАЛИЗАЦИЯ СОРТИРОВКИ (downloads.html)
function initSorting(albums) {
    const sortBy = document.getElementById("sort-by");
    const resetSortBtn = document.getElementById("reset-sort");

    // Если элементов нет — мы не на downloads.html
    if (!sortBy) return;

    // Показываем все альбомы по умолчанию
    renderDownloadsGrid(albums);

    // Функция сортировки
    function applySorting() {
        let sorted = [...albums];

        const sortValue = sortBy.value;

        switch (sortValue) {
            case "year-desc":
                sorted.sort((a, b) => b.year - a.year);
                break;
            case "year-asc":
                sorted.sort((a, b) => a.year - b.year);
                break;
            case "title-asc":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "title-desc":
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "artist-asc":
                sorted.sort((a, b) => a.artist.localeCompare(b.artist));
                break;
            case "artist-desc":
                sorted.sort((a, b) => b.artist.localeCompare(a.artist));
                break;
            case "date-added-desc":
            default:
                // Default order
                break;
        }

        renderDownloadsGrid(sorted);
    }

    // Обработчик сортировки — срабатывает сразу при изменении
    sortBy.addEventListener("change", applySorting);

    // Обработчик кнопки "Reset"
    if (resetSortBtn) {
        resetSortBtn.addEventListener("click", () => {
            sortBy.value = "date-added-desc";
            renderDownloadsGrid(albums); // Показываем все в исходном порядке
        });
    }
}

// 7. НОВИНКИ (На главной)
function renderNewAlbums(albums) {
    const container = document.getElementById("new-albums");
    if (!container) return;

    const last5 = albums.slice(-5).reverse(); // Последние 5, сначала новые
    last5.forEach(album => {
        const div = document.createElement("div");
        div.className = "album-mini";
        div.innerHTML = `
          <a href="/albums/${album.id}">
            <img src="${album.img}" alt="${album.title}">
          </a>
          <p><strong>${album.artist}</strong><br>${album.title}</p>
        `;
        container.appendChild(div);
    });
}

// 8. ВЕРСИИ КОЛЛЕКЦИИ (about.html / index.html)
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

// 9. ПРОСТОЙ СПИСОК (если нужен)
function renderSimpleList(albums) {
    const list = document.getElementById("album-list");
    if (!list) return;
    albums.forEach(album => {
        const li = document.createElement("li");
        li.textContent = `${album.artist} — ${album.title} (${album.year})`;
        list.appendChild(li);
    });
}

// 10. ПОДСВЕТКА МЕНЮ
function highlightActiveNav() {
    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && location.pathname.includes(href)) {
            link.classList.add("active");
        }
    });
}

// ЗАПУСК
init();
