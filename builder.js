// Содержимое файла digest-builder.js (Финальная, надежная автономная версия)

document.addEventListener('DOMContentLoaded', () => {

    console.log("Digest Builder (Надежная версия): Скрипт запущен.");

    // 1. Наш список рубрик. Проверь, что все файлы на месте.
    const rubricData = {
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
    
    // 2. Наш контейнер на главной странице.
    const digestContainer = document.getElementById('digest-articles-container');
    if (!digestContainer) {
        console.error('ОШИБКА: Контейнер #digest-articles-container не найден.');
        return;
    }

    // 3. Функция для загрузки и извлечения ОДНОЙ статьи
    function fetchLatestArticle(pageFile, rubric) {
        
        // Создаем невидимый iframe-портал
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = pageFile;
        document.body.appendChild(iframe); // Сразу добавляем на страницу, чтобы началась загрузка

        // Функция, которая будет пытаться "достучаться" до контента
        const tryToExtractContent = () => {
            try {
                // Пытаемся получить доступ к документу внутри iframe
                const iframeDoc = iframe.contentWindow && iframe.contentWindow.document;

                // Если документ еще не готов или пуст, попробуем еще раз через 100 мс
                if (!iframeDoc || iframeDoc.readyState !== 'complete') {
                    setTimeout(tryToExtractContent, 100);
                    return;
                }

                // ДОКУМЕНТ ГОТОВ!
                console.log(`Портал в ${pageFile} открыт.`);
                
                // Находим первую статью
                const articleElement = iframeDoc.querySelector('.articles-column .content-block');

                if (articleElement) {
                    // "Дорисовываем" рубрику
                    const metadataBlock = articleElement.querySelector('.metadata');
                    if (metadataBlock) {
                        const categoryHTML = `<a href="${pageFile}"><i class="metadata-icon icon-category"></i>${rubric.name}</a>`;
                        metadataBlock.insertAdjacentHTML('afterbegin', categoryHTML);
                    }
                    
                    // Вставляем статью в дайджест
                    digestContainer.insertAdjacentHTML('beforeend', articleElement.outerHTML);
                    console.log(`УСПЕХ: Статья из ${pageFile} добавлена.`);
                } else {
                    console.warn(`ВНИМАНИЕ: На странице ${pageFile} не найдено статей.`);
                }

                // Уничтожаем iframe после использования
                document.body.removeChild(iframe);

            } catch (e) {
                // Если произошла ошибка доступа (например, из-за безопасности), сообщаем об этом
                console.error(`Критическая ошибка доступа к ${pageFile}. Убедитесь, что нет междоменных ограничений.`, e);
                // И все равно удаляем iframe
                if (iframe.parentElement) {
                    document.body.removeChild(iframe);
                }
            }
        };

        // Запускаем первую попытку "достучаться"
        setTimeout(tryToExtractContent, 100);
    }

    // 4. Запускаем процесс для каждой рубрики
    for (const pageFile in rubricData) {
        fetchLatestArticle(pageFile, rubricData[pageFile]);
    }
});