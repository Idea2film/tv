document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================================================
    // --- ЛОГИКА ПОИСКА ---
    // ===================================================================
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const articles = document.querySelectorAll('.articles-column .content-block');
    const authorFilters = document.querySelectorAll('input[name="author-filter"]');
    const allAuthorsRadio = document.getElementById('author-all');

    if (!searchInput) return; // Если на странице нет поиска, ничего не делаем

    function filterArticles() {
        const query = searchInput.value.toLowerCase().trim();
        
        // Показываем или скрываем кнопку очистки
        searchClearBtn.style.display = query.length > 0 ? 'block' : 'none';
        
        // Если поиск активен, сбрасываем фильтр авторов на "Все"
        if (query.length > 0 && allAuthorsRadio && !allAuthorsRadio.checked) {
            allAuthorsRadio.checked = true;
            // Инициируем событие 'change', чтобы CSS-фильтр сработал
            allAuthorsRadio.dispatchEvent(new Event('change'));
        }

        articles.forEach(article => {
            // Проверяем, видима ли статья согласно CSS-фильтрам
            const isVisibleByCss = window.getComputedStyle(article).display !== 'none';
            
            if (query.length > 0) { // Если есть поисковый запрос
                const articleText = article.textContent.toLowerCase();
                const isMatch = articleText.includes(query);
                article.style.display = isMatch ? 'flex' : 'none'; // Используем flex для десктопа или block для мобильных в зависимости от стилей
            } else { // Если поисковый запрос пуст
                article.style.display = ''; // Сбрасываем инлайновый стиль, чтобы CSS снова управлял видимостью
            }
        });
    }

    // Очистка поиска по клику на кнопку
    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterArticles(); // Вызываем фильтрацию, чтобы все статьи снова появились
        searchInput.focus();
    });
    
    // Запускаем фильтрацию при каждом вводе символа
    searchInput.addEventListener('input', filterArticles);

    // Если пользователь выбирает фильтр по автору, очищаем поиск
    authorFilters.forEach(radio => {
        radio.addEventListener('change', () => {
            if (searchInput.value.length > 0) {
                searchInput.value = '';
                searchClearBtn.style.display = 'none';
                // CSS сам отфильтрует статьи после смены радиокнопки
            }
        });
    });
});