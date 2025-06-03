// Обратный отсчёт
        function updateCountdown() {
            const launchDate = new Date('July 1, 2025 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = launchDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Адаптация колонок для горизонтальных экранов
        function checkScreenOrientation() {
            const contentGrid = document.querySelector('.content-grid');
            const isLandscape = window.matchMedia("(orientation: landscape)").matches;
            const width = window.innerWidth;
            
            if (isLandscape) {
                if (width >= 1536) {
                    contentGrid.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
                } else if (width >= 1024) {
                    contentGrid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
                }
            } else {
                contentGrid.style.gridTemplateColumns = 'repeat(1, minmax(0, 1fr))';
            }
        }
        
        window.addEventListener('resize', checkScreenOrientation);
        window.addEventListener('load', checkScreenOrientation);
