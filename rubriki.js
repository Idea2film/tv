document.addEventListener('DOMContentLoaded', () => {

    // "База данных" рубрик: сопоставляет имя файла с названием рубрики.
    const categoryMap = {
        "theater.html":       { name: "Театр" },
        "movies.html":        { name: "Кино" },
        "music.html":         { name: "Музыка" },
        "anime.html":         { name: "Аниме" },
        "games.html":         { name: "Игры" },
        "school.html":        { name: "Школа" },
        "fashion.html":       { name: "Мода" },
        "netanya.html":       { name: "Нетания" },
        "relationships.html": { name: "Психология" },
        "journalism.html":    { name: "Журналистика" }
    };

    // Функция, которая определяет страницу и вставляет нужную рубрику ВНУТРЬ СТАТЬИ.
    function autoAssignCategoryToArticles() {
        const path = window.location.pathname;
        const currentPageFile = path.substring(path.lastIndexOf('/') + 1);
        
        const categoryData = categoryMap[currentPageFile];
        
        // Если мы не на странице известной рубрики, ничего не делаем
        if (!categoryData) return;

        // Создаем HTML-код для вставки
        const categoryHTML = `
            <a href="${currentPageFile}">
                <i class="metadata-icon icon-category"></i>${categoryData.name}
            </a>
        `;
        
        // Находим ВСЕ блоки метаданных на странице
        const allMetadataBlocks = document.querySelectorAll('.content-block .metadata');
        
        // Вставляем нашу рубрику в начало каждого блока
        allMetadataBlocks.forEach(block => {
            block.insertAdjacentHTML('afterbegin', categoryHTML);
        });
    }

    // Запускаем функцию
    autoAssignCategoryToArticles();
});