document.addEventListener('DOMContentLoaded', () => {
    // Словарь для быстрой генерации ссылок на рубрики
    const rubricLinks = {
        'психология': 'relationships.html',
        'нетания': 'netanya.html',
        'театр': 'theater.html',
        'мода': 'fashion.html',
        'аниме': 'anime.html',
        'кино': 'movies.html',
        'игры': 'games.html',
        'музыка': 'music.html',
        'школа': 'school.html',
        'журналистика': 'site.html'
    };

    // 1. Данные об авторах с указанием, есть ли у них фото
    const authors = [
        {
            id: 'ksenya', initials: 'Н', name: 'Нари', hasPhoto: true, // У Нари есть фото
            description: 'Разбирает по косточкам ваши сны и подскажет, на какой спектакль точно стоит сходить.',
            rubrics: ['психология', 'нетания', 'театр']
        },
        {
            id: 'sonya', initials: 'И', name: 'Ивори', hasPhoto: false, // У Ивори нет фото
            description: 'Знает, какой шмот будет в тренде завтра и какой тайтл аниме нельзя пропускать в этом сезоне. Спойлер: оба.',
            rubrics: ['мода', 'аниме']
        },
        {
            id: 'varya', initials: 'Б', name: 'Басся', hasPhoto: true, // У Басси есть фото
            description: 'Её плейлист всегда свежий, а мнение о новом фильме вы услышите первым. Готовьтесь спорить!',
            rubrics: ['кино', 'игры', 'музыка']
        },
        {
            id: 'max', initials: 'Z', name: 'Zashebu', hasPhoto: false,
            description: 'Может часами спорить о том, был ли финал "Атаки титанов" гениальным и какая концовка в Cyberpunk 2077 канон.',
            rubrics: ['кино', 'аниме', 'игры']
        },
        {
            id: 'noam', initials: 'Н', name: 'Ноам', hasPhoto: false,
            description: 'Откопает для вас забытый инди-рок и объяснит, почему музыка в том самом фильме Тарантино гениальна.',
            rubrics: ['музыка', 'кино']
        },
        {
            id: 'mia', initials: 'М', name: 'Мияшо', hasPhoto: true, // У Мияшо есть фото
            description: 'Думаете, школа — это скучно? Мияшо докажет обратное и покажет, как получать от учебы кайф (и хорошие оценки).',
            rubrics: ['школа']
        },
        {
            id: 'shelli', initials: 'Ш', name: 'Шейлли', hasPhoto: false,
            description: 'Знает, как прокачать скиллы не только в играх, но и на контрольной по математике. Лайфхаки — её стихия.',
            rubrics: ['школа', 'игры']
        },
        {
            id: 'dasha', initials: 'С', name: 'Сади', hasPhoto: false,
            description: 'Наш секретный агент. Готовит что-то грандиозное. Следите за обновлениями!',
            rubrics: []
        },
        {
            id: 'blunder', initials: 'ИП', name: 'Илья Панфилов', hasPhoto: true, // У Ильи есть фото
            description: 'Тот самый человек, который сделал этот сайт. А в перерывах смотрит столько кино, что готов конкурировать с IMDb.',
            rubrics: ['журналистика', 'кино']
        },
        {
            id: 'elena', initials: 'ЕС', name: 'Елена Саханова', hasPhoto: false,
            description: 'Видела столько спектаклей, что может предсказать, когда упадет занавес, с точностью до секунды. Её рецензиям можно верить.',
            rubrics: ['театр']
        }
    ];

    // 2. Проходим по каждому автору в нашем списке
    authors.forEach(author => {
        const cardContainer = document.getElementById(`bio-${author.id}`);
        if (cardContainer) {
            
            // --- НОВАЯ ЛОГИКА ДЛЯ АВАТАРА ---
            let avatarHTML = '';
            // Проверяем флаг hasPhoto
            if (author.hasPhoto) {
                // Если фото есть, создаем тег <img>. Путь к фото формируется автоматически.
                avatarHTML = `<img src="images/${author.id}.jpg" alt="Фото автора ${author.name}" class="author-avatar">`;
            } else {
                // Если фото нет, оставляем div с инициалами, как и раньше.
                avatarHTML = `<div class="author-avatar" data-initials="${author.initials}"></div>`;
            }
            // --- КОНЕЦ НОВОЙ ЛОГИКИ ---

            let rubricsHTML = '';
            if (author.rubrics && author.rubrics.length > 0) {
                const rubricTitle = author.rubrics.length === 1 ? 'Автор рубрики' : 'Автор рубрик';
                const linksArray = author.rubrics.map(name => `<a href="${rubricLinks[name.toLowerCase()] || '#'}">${name}</a>`);
                rubricsHTML = `<p><b>${rubricTitle}:</b> ${linksArray.join(', ')}</p>`;
            } else if (author.id === 'dasha') {
                rubricsHTML = '<p><b>Рубрики:</b> Пока в секрете!</p>';
            }

            // 3. Собираем финальный HTML для карточки, используя новую переменную avatarHTML
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
});