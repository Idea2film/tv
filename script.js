document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // --- БЛОК 1: ГЕНЕРАЦИЯ СЛАЙДЕРА (НОВЫЙ КОД) ---
    // ===================================================================
    
    // 1.1. Единый источник правды для слайдов. Редактируй только его.
    const sliderData = [
        { href: "theater.html",      caption: "Театр" },
        { href: "movies.html",       caption: "Кино" },
        { href: "music.html",        caption: "Музыка" },
        { href: "anime.html",        caption: "Аниме" },
        { href: "games.html",        caption: "Игры" },
        { href: "school.html",       caption: "Школа" },
        { href: "fashion.html",      caption: "Мода" },
        { href: "netanya.html",      caption: "Нетания" },
        { href: "relationships.html",caption: "Психология" },
        { href: "journalism.html",   caption: "Журналистика" }
    ];

    // 1.2. Функция, которая "рисует" слайдер.
    function generateSlider() {
        const sliderTrack = document.querySelector('.slider-track');
        if (sliderTrack) {
            let sliderHTML = '';
            sliderData.forEach(item => {
                sliderHTML += `<a href="${item.href}" class="slide"><span class="slide-caption">${item.caption}</span></a>`;
            });
            sliderTrack.innerHTML = sliderHTML;
        }
    }
    
    // ===================================================================
    // --- БЛОК 2: ГЕНЕРАЦИЯ ОГЛАВЛЕНИЯ И BIO-КАРТОЧЕК (НОВЫЙ КОД) ---
    // ===================================================================

    // 2.1. Единый источник правды для авторов (для оглавления).
    // Ключи ("Blunder", "Мияшо") должны совпадать с data-author в HTML.
    const authorsTocData = {
        "Blunder":        { id: "blunder", name: "Blunder" },
        "Мияшо":          { id: "mia",     name: "Мияшо" },
        "Zashebu":        { id: "max",     name: "Zashebu" },
        "Нари":           { id: "ksenya",  name: "Нари" },
        "Ивори":          { id: "sonya",   name: "Ивори" },
        "Басся":          { id: "varya",   name: "Басся" },
        "Ноам":           { id: "noam",    name: "Ноам" },
        "Шейлли":         { id: "shelli",  name: "Шейлли" },
        "Сади":           { id: "dasha",   name: "Сади" },
        "Елена Саханова": { id: "elena",   name: "Елена Саханова" }
    };

    // 2.2. Функция, которая "рисует" оглавление и bio-карты.
    function generateTableOfContents() {
        const articles = document.querySelectorAll('.articles-column .content-block');
        const tocContainer = document.getElementById('table-of-contents-container');
        const bioContainer = document.getElementById('bio-cards-container');

        if (!articles.length || !tocContainer || !bioContainer) return;

        let tocHTML = '';
        const uniqueAuthorsOnPage = new Set();

        articles.forEach(article => {
            const postId = article.id;
            const titleElement = article.querySelector('h2, h3');
            const titleText = titleElement ? titleElement.textContent.trim() : 'Без заголовка';
            const authorName = article.dataset.author;
            const dateText = article.querySelector('.icon-date')?.parentElement.textContent.trim() || '';
            const isVideo = article.querySelector('.video-container') ? 'toc-video-item' : '';
            const authorInfo = authorsTocData[authorName];

            if (authorInfo) {
                tocHTML += `
                    <li class="${isVideo}" data-author="${authorName}">
                        <a href="#${postId}">${titleText}</a>
                        <div class="toc-metadata">${dateText} | <label for="author-${authorInfo.id}" class="author-filter-trigger">${authorInfo.name}</label></div>
                    </li>
                `;
                uniqueAuthorsOnPage.add(authorName);
            }
        });

        tocContainer.innerHTML = tocHTML;

        let bioHTML = '';
        uniqueAuthorsOnPage.forEach(authorName => {
            const authorInfo = authorsTocData[authorName];
            if (authorInfo) {
                bioHTML += `<div id="bio-${authorInfo.id}" class="author-bio-card" data-author="${authorName}"></div>`;
            }
        });
        bioContainer.innerHTML = bioHTML;
    }

    // ===================================================================
    // --- БЛОК 3: ГЕНЕРАЦИЯ СОДЕРЖИМОГО BIO-КАРТОЧЕК (ТВОЙ СТАРЫЙ КОД, ЧУТЬ ИЗМЕНЕН) ---
    // ===================================================================
    
    // 3.1. Твоя существующая база данных авторов.
    const rubricLinks = {
        'психология': 'relationships.html', 'нетания': 'netanya.html', 'театр': 'theater.html',
        'мода': 'fashion.html', 'аниме': 'anime.html', 'кино': 'movies.html', 'игры': 'games.html',
        'музыка': 'music.html', 'школа': 'school.html', 'журналистика': 'journalism.html'
    };
    
    const authorsCardData = [
        { id: 'ksenya', initials: 'Н', name: 'Нари', hasPhoto: false, description: 'Разбирает по косточкам ваши сны и подскажет, на какой спектакль точно стоит сходить.', rubrics: ['психология', 'нетания', 'театр'] },
        { id: 'sonya', initials: 'И', name: 'Ивори', hasPhoto: false, description: 'Знает, какой шмот будет в тренде завтра и какой тайтл аниме нельзя пропускать в этом сезоне. Спойлер: оба.', rubrics: ['мода', 'аниме'] },
        { id: 'varya', initials: 'Б', name: 'Басся', hasPhoto: false, description: 'Её плейлист всегда свежий, а мнение о новом фильме вы услышите первым. Готовьтесь спорить!', rubrics: ['кино', 'игры', 'музыка'] },
        { id: 'max', initials: 'Z', name: 'Zashebu', hasPhoto: false, description: 'Может часами спорить о том, был ли финал "Атаки титанов" гениальным и какая концовка в Cyberpunk 2077 канон.', rubrics: ['кино', 'аниме', 'игры'] },
        { id: 'noam', initials: 'Н', name: 'Ноам', hasPhoto: false, description: 'Откопает для вас забытый инди-рок и объяснит, почему музыка в том самом фильме Тарантино гениальна.', rubrics: ['музыка', 'кино'] },
        { id: 'mia', initials: 'М', name: 'Мияшо', hasPhoto: false, description: 'Думаете, школа — это скучно? Мияшо докажет обратное и покажет, как получать от учебы кайф (и хорошие оценки).', rubrics: ['школа'] },
        { id: 'shelli', initials: 'Ш', name: 'Шейлли', hasPhoto: false, description: 'Знает, как прокачать скиллы не только в играх, но и на контрольной по математике. Лайфхаки — её стихия.', rubrics: ['школа', 'игры'] },
        { id: 'dasha', initials: 'С', name: 'Сади', hasPhoto: false, description: 'Наш секретный агент. Готовит что-то грандиозное. Следите за обновлениями!', rubrics: [] },
        { id: 'blunder', initials: 'B', name: 'Blunder', hasPhoto: true, description: 'Тот самый человек, который сделал этот сайт. А в перерывах смотрит столько кино, что готов конкурировать с IMDb.', rubrics: ['журналистика', 'кино'] },
        { id: 'elena', initials: 'ЕС', name: 'Елена Саханова', hasPhoto: true, description: 'Видела столько спектаклей, что может предсказать, когда упадет занавес, с точностью до секунды. Её рецензиям можно верить.', rubrics: ['театр'] }
    ];

    // 3.2. Функция, которая заполняет bio-карточки.
    function generateBioCardsContent() {
        authorsCardData.forEach(author => {
            const cardContainer = document.getElementById(`bio-${author.id}`);
            if (cardContainer) {
                let avatarHTML = author.hasPhoto 
                    ? `<img src="images/avatars/${author.id}.jpg" alt="Фото автора ${author.name}" class="author-avatar">`
                    : `<div class="author-avatar" data-initials="${author.initials}"></div>`;

                let rubricsHTML = '';
                if (author.rubrics && author.rubrics.length > 0) {
                    const rubricTitle = author.rubrics.length === 1 ? 'Автор рубрики' : 'Автор рубрик';
                    const linksArray = author.rubrics.map(name => `<a href="${rubricLinks[name.toLowerCase()] || '#'}">${name}</a>`);
                    rubricsHTML = `<p><b>${rubricTitle}:</b> ${linksArray.join(', ')}</p>`;
                } else if (author.id === 'dasha') {
                    rubricsHTML = '<p><b>Рубрики:</b> Пока в секрете!</p>';
                }

                const cardHTML = `
                    ${avatarHTML}
                    <div class="author-info">
                        <h3>${author.name}</h3>
                        ${rubricsHTML}
                        <p>${author.description}</p>
                    </div>
                    <label for="author-all" class="close-bio-button" aria-label="Закрыть">×</label>
                `;
                cardContainer.innerHTML = cardHTML;
            }
        });
    }

    // ===================================================================
    // --- ЗАПУСК ВСЕХ ФУНКЦИЙ ---
    // ===================================================================
    generateSlider();
    generateTableOfContents();
    generateBioCardsContent(); // Эта функция теперь будет работать корректно, т.к. bio-карточки уже созданы
});