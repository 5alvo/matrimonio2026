document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursore personalizzato
    const cursor = document.querySelector('.custom-cursor');
    if(cursor) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // 2. Countdown: 29 Agosto 2026 alle 16:30
    const weddingDate = new Date("August 29, 2026 16:30:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = weddingDate - now;
        
        if (diff > 0) {
            document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        }
    };
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Logica Scroll (Barra progresso, Navbar e Reveal sezioni)
    const nav = document.getElementById('mainNav');
    const reveals = document.querySelectorAll('.section-reveal');
    const scrollHint = document.getElementById('scrollHint');
    const progressLine = document.getElementById("scroll-progress");

    window.addEventListener('scroll', () => {
        // Calcolo Scroll Progress Line
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(progressLine) progressLine.style.width = scrolled + "%";

        // Navbar scrolled state
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        // Scroll Hint visibility
        if (window.scrollY > 100) {
            scrollHint.style.opacity = "0";
            scrollHint.style.pointerEvents = "none";
        } else {
            scrollHint.style.opacity = "1";
        }

        // Section reveals
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) el.classList.add('active');
        });
    });
});

// 4. Funzione Copia IBAN
function copyIBAN() {
    const iban = document.getElementById('iban-code').innerText;
    const status = document.getElementById('copy-status');
    
    navigator.clipboard.writeText(iban).then(() => {
        const originalText = status.innerText;
        status.innerText = "IBAN COPIATO!";
        status.style.color = "#B35A76";
        status.style.fontWeight = "700";
        
        setTimeout(() => {
            status.innerText = originalText;
            status.style.color = "";
            status.style.fontWeight = "";
        }, 3000);
    });
}
