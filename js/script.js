// INIT FUNCTION
async function init() {
  renderNewsTeaser();
  }

// LUCKY BUTTON
document.getElementById("random-btn").addEventListener("click", async () => {
try {
const res = await fetch("/data/downloads.json");
const list = await res.json();
const file = list[Math.floor(Math.random() * list.length)];
window.location.href = "/downloads/" + file;
} catch (err) {
console.error("Не удалось загрузить список:", err);
}
});

// ACTIVE NAV HIGHLIGHT
function highlightActiveNav() {
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && location.pathname.includes(href)) {
      link.classList.add("active");
    }
  });
}

// GOAT COUNTER (I DONT KNOW)
var t = setInterval(function () {
  if (window.goatcounter?.visit_count) {
    clearInterval(t);

    window.goatcounter.visit_count({
      append: "#counter",
      callback: function (count) {
        document.querySelector("#counter").textContent =
          `You are visitor #${count} on snofolk.space`;
      },
    });
    А;
  }
}, 100);


// LATEST NEWS
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

    container.innerHTML =
      latestNews
        .map((news) => {
          const title =
            news.querySelector(".news-header")?.textContent?.trim() ||
            "Untitled news";
          const date = getNewsDate(news);
          const summary = getNewsSummary(news);

          return `
                <div class="news-item-preview">
                    ${date ? `<span class="news-date">${date}</span>` : ""}
                    <h3>${escapeHTML(title)}</h3>
                    ${summary ? `<p>${escapeHTML(summary)}</p>` : ""}
                </div>
            `;
        })
        .join("") +
      `<a href="news.html" class="other-like-btn">All news &rarr;</a>`;
  } catch (error) {
    console.warn("Could not load latest news teaser:", error);
  }
}

function getNewsDate(news) {
  const dateParagraph = Array.from(news.querySelectorAll("p")).find((p) =>
    p.textContent.trim().startsWith("ㅤ"),
  );

  return dateParagraph
    ? dateParagraph.textContent.replace(/^ㅤ\s*/i, "").trim()
    : "";
}

function getNewsSummary(news) {
  const firstListItem = news.querySelector("li");
  if (firstListItem) return firstListItem.textContent.trim();

  const summaryParagraph = Array.from(news.querySelectorAll("p")).find(
    (p) => !p.textContent.trim().startsWith("ㅤ"),
  );

  return summaryParagraph ? summaryParagraph.textContent.trim() : "";
}

function escapeHTML(value) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

// START
init();
