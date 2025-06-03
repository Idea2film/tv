// search.js — поиск по сайту

const pages = [
  "index.html",
  "video.html",
  "news.html",
  "anime.html",
  "games.html",
  "fashion.html",
  "music.html",
  "movies.html",
  "netanya.html",
  "relationships.html",
  "theater.html",
  "school.html"
];

const searchInput = document.getElementById("searchInput");
const resultsBox = document.getElementById("searchResults");

function extractYouTubeID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7] && match[7].length === 11 ? match[7] : false;
}

async function performSearch(query) {
  if (!searchInput || !resultsBox) return;

  if (!query.trim()) {
    resultsBox.innerHTML = "";
    resultsBox.classList.add("hidden");
    return;
  }

  let foundResults = [];

  for (const page of pages) {
    try {
      const response = await fetch(page);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // Извлечение метаданных
      const metadata = doc.querySelector(".page-metadata");
      const title = doc.title || page;

      let category = "",
          author = "",
          date = "",
          videoUrl = "",
          contentText = "";

      if (metadata) {
        category = metadata.getAttribute("data-category") || "";
        author = metadata.getAttribute("data-author") || "";
        date = metadata.getAttribute("data-date") || "";
        videoUrl = metadata.getAttribute("data-video") || "";
        contentText = metadata.textContent + " " + doc.body.textContent;
      } else {
        contentText = doc.body.textContent;
      }

      const queryLC = query.toLowerCase();
      const contentLC = contentText.toLowerCase();

      if (contentLC.includes(queryLC)) {
        const snippetStart = Math.max(0, contentLC.indexOf(queryLC) - 60);
        const snippetEnd = Math.min(contentText.length, contentLC.indexOf(queryLC) + queryLC.length + 120);
        const snippet = contentText.slice(snippetStart, snippetEnd);

        foundResults.push({
          url: page,
          title: title,
          category: category,
          author: author,
          date: date,
          videoUrl: videoUrl,
          snippet: snippet.substring(0, 120) + "..."
        });
      }
    } catch (err) {
      console.error(`Ошибка загрузки ${page}:`, err);
    }
  }

  showResults(foundResults);
}

function getCategoryIcon(category) {
  switch (category) {
    case "Аниме": return '<i class="fas fa-dragon category-icon-search"></i>';
    case "Игры": return '<i class="fas fa-gamepad category-icon-search"></i>';
    case "Мода": return '<i class="fas fa-tshirt category-icon-search"></i>';
    case "Музыка": return '<i class="fas fa-music category-icon-search"></i>';
    case "Кино": return '<i class="fas fa-film category-icon-search"></i>';
    case "Нетания": return '<i class="fas fa-umbrella-beach category-icon-search"></i>';
    case "Отношения": return '<i class="fas fa-smile category-icon-search"></i>';
    case "Театр": return '<i class="fas fa-theater-masks category-icon-search"></i>';
    case "Школа": return '<i class="fas fa-graduation-cap category-icon-search"></i>';
    default: return "";
  }
}

function showResults(results) {
  resultsBox.innerHTML = "";
  if (results.length === 0) {
    resultsBox.classList.remove("hidden");
    resultsBox.innerHTML = '<div class="text-gray-400 text-sm p-2">Ничего не найдено</div>';
    return;
  }

  results.forEach(result => {
    const item = document.createElement("div");
    item.className = "search-result-item";

    const icon = getCategoryIcon(result.category);
    const videoBadge = result.videoUrl
      ? '<i class="fas fa-video video-badge ml-2 text-red-500"></i>'
      : "";

    let metaHTML = "";
    if (result.category || result.author || result.date) {
      metaHTML = `
        <div class="search-result-meta">
          ${icon} ${result.category}
          ${videoBadge}
          ${result.author ? ` | Автор: ${result.author}` : ""}
          ${result.date ? ` | Дата: ${result.date}` : ""}
        </div>
      `;
    }

    item.innerHTML = `
      <a href="${result.url}" target="_blank" class="search-result-title">${result.title}</a>
      ${metaHTML}
      <div class="result-snippet">${result.snippet}</div>
    `;

    resultsBox.appendChild(item);
  });

  resultsBox.classList.remove("hidden");
}

if (searchInput && resultsBox) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    performSearch(query);
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".search-container")) {
      resultsBox.classList.add("hidden");
    }
  });
}
