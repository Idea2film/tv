// menu.js
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropdownButton = document.querySelector('.dropdown button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const categoryItems = document.querySelectorAll('.category-item');

    // === Открытие/закрытие меню по клику ===
    dropdownButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu.classList.toggle('open');
    });

    // === Выделение активной категории ===
    categoryItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // ❗ ВАЖНО: убрали e.preventDefault(), чтобы ссылка работала
            e.stopPropagation();

            // Снимаем активность с других элементов
            categoryItems.forEach(i => {
                i.classList.remove('active');
                const textSpan = i.querySelector('.category-text');
                if (textSpan) textSpan.style.fontWeight = 'normal';
            });

            // Добавляем активность текущему
            this.classList.add('active');
            const textSpan = this.querySelector('.category-text');
            if (textSpan) textSpan.style.fontWeight = 'bold';

            // Закрываем меню на мобильных устройствах
            if (window.innerWidth < 640) {
                dropdownMenu.classList.remove('open');
            }
        });
    });

    // === Закрытие меню при клике вне его ===
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.classList.remove('open');
        }
    });

    // === Адаптация к размеру экрана ===
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 640 && dropdownMenu.classList.contains('open')) {
            dropdownMenu.classList.remove('open');
        }
    });
});
