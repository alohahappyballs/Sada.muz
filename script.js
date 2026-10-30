document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ПЕЧАТНАЯ МАШИНКА ---
    const typewriters = document.querySelectorAll('.typewriter-text');
    const typeSpeed = 60; 

    async function typeWriter(element, speed) {
        return new Promise((resolve) => {
            const text = element.getAttribute('data-text');
            if (!text) return resolve();

            let i = 0;
            element.classList.add('typing-active'); 
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed + Math.random() * 30);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    async function startTyping() {
        for (let i = 0; i < typewriters.length; i++) {
            const el = typewriters[i];
            
            if (i > 0) {
                typewriters[i - 1].classList.remove('typing-active');
                await new Promise(r => setTimeout(r, 200)); 
            }
            
            await typeWriter(el, typeSpeed);
        }
    }

    if (typewriters.length > 0) {
        setTimeout(startTyping, 300);
    }

    // --- 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ ---
    // Включаем .showcase, чтобы скриншот тоже появлялся красиво
    const reveals = document.querySelectorAll('.card, .section h2, .showcase');
    
    if (reveals.length > 0) {
        reveals.forEach(el => el.classList.add('reveal'));

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 100;

            reveals.forEach(reveal => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Проверяем при загрузке
    }
});