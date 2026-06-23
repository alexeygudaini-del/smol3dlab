document.addEventListener('DOMContentLoaded', function() {
    fetch('config.json')
    .then(response => response.json())
    .then(config => {
        // 1. САМОЕ ВАЖНОЕ: Сохраняем конфиг глобально, чтобы калькулятор мог брать отсюда цены!
        window.SiteConfig = config;

        // 2. Вставляем цвета и настройки UI в CSS
        const style = document.createElement('style');
        style.textContent = `
        :root {
            --main-bg: ${config.colors['background-main']};
            --accent-color: ${config.colors.accent};
            --font-family-sans: ${config.typography['font-family']};
            
            /* Оттенки серого */
            --gray-700: ${config.colors['surface-shades']['gray-700']};
            --gray-600: ${config.colors['surface-shades']['gray-600']};
            
            /* Настройки размеров и скоростей из JSON */
            --circle-size: ${config.ui_settings.process_circle_size};
            --icon-size: ${config.ui_settings.process_icon_size};
            --speed-fast: ${config.ui_settings.reviews_speed_fast};
            --speed-normal: ${config.ui_settings.reviews_speed_normal};
        }

        /* Перехватываем скорости анимаций Tailwind */
        .animate-scroll-y-fast { animation-duration: var(--speed-fast) !important; }
        .animate-scroll-y-normal { animation-duration: var(--speed-normal) !important; }
        `;
        document.head.appendChild(style);
    })
    .catch(error => {
        console.error('Ошибка загрузки config.json:', error);
        // Базовые резервные стили при ошибке загрузки
        const fallbackStyle = document.createElement('style');
        fallbackStyle.textContent = `
        :root {
            --main-bg: #FFFFFF;
            --accent-color: #f97316;
            --font-family-sans: 'Roboto', sans-serif;
            --gray-700: #334155;
            --gray-600: #475569;
            --circle-size: 144px;
            --icon-size: 120px;
            --speed-fast: 35s;
            --speed-normal: 25s;
        }
        `;
        document.head.appendChild(fallbackStyle);
    });
});
