document.addEventListener('DOMContentLoaded', () => {

    // 1. "База данных" рубрик: сопоставляет имя файла с данными.
    // Добавляем префикс для ID.
    const categoryMap = {
        "theater.html":       { name: "Театр",       idPrefix: "theater" },
        "movies.html":        { name: "Кино",        idPrefix: "movies" },
        "music.html":         { name: "Музыка",      idPrefix: "music" },
        "anime.html":         { name: "Аниме",       idPrefix: "anime" },
        "games.html":         { name: "Игры",        idPrefix: "games" },
        "school.html":        { name: "Школа",       idPrefix: "school" },
        "fashion.html":       { name: "Мода",        idPrefix: "fashion" },
        "netanya.html":       { name: "Нетания",     idPrefix: "netanya" },
        "relationships.html": { name: "Психология",  idPrefix: "relationships" },
        "journalism.html":    { name: "Журналистика",idPrefix: "journalism" }
    };

    // 2. Функция, которая делает всю магию.
    function processArticlesOnPage() {
        const path = window.location.pathname;
        const currentPageFile = path.substring(path.lastIndexOf('/') + 1);
        
        const categoryData = categoryMap[currentPageFile];
        
        // Если мы не на странице известной рубрики, ничего не делаем.
        if (!categoryData) return;

        // Находим ВСЕ статьи на текущей странице.
        const allArticles = document.querySelectorAll('.articles-column .content-block');
        
        // Создаем HTML-код для вставки рубрики.
        const categoryHTML = `<a href="${currentPageFile}"><i class="metadata-icon icon-category"></i>${categoryData.name}</a>`;
        
        // 3. Пробегаемся по каждой статье и нумеруем ее.
        allArticles.forEach((article, index) => {
            // --- НОВАЯ ЛОГИКА: ГЕНЕРАЦИЯ ID ---
            // Номер будет 01, 02, ..., 10, 11 и т.д.
            // `index + 1` - чтобы нумерация шла с 1, а не с 0.
            // `.toString().padStart(2, '0')` - чтобы добавить ведущий ноль для чисел < 10.
            const articleNumber = (index + 1).toString().padStart(2, '0');
            const newId = `${categoryData.idPrefix}${articleNumber}`;
            
            // Присваиваем новый ID статье.
            article.id = newId;

            // --- СТАРАЯ ЛОГИКА: ДОБАВЛЕНИЕ РУБРИКИ ---
            const metadataBlock = article.querySelector('.metadata');
            if (metadataBlock) {
                // Вставляем рубрику в начало блока метаданных.
                metadataBlock.insertAdjacentHTML('afterbegin', categoryHTML);
            }
        });
    }

    // Запускаем нашу функцию.
    processArticlesOnPage();
});