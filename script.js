document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursore
    const cursor = document.querySelector('.custom-cursor');
    if(cursor) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // 2. Countdown
    const weddingDate = new Date("August 29, 2026 16:00:00").getTime();
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

    // 3. Scroll Logic
    const nav = document.getElementById('mainNav');
    const reveals = document.querySelectorAll('.section-reveal');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) el.classList.add('active');
        });
    });
});

// 4. Copia IBAN (fuori dal DOMContentLoaded per essere globale)
function copyIBAN() {
    const iban = document.getElementById('iban-code').innerText;
    const status = document.getElementById('copy-status');
    
    navigator.clipboard.writeText(iban).then(() => {
        const originalText = status.innerText;
        status.innerText = "IBAN COPIATO";
        status.style.opacity = "1";
        
        setTimeout(() => {
            status.innerText = originalText;
            status.style.opacity = "0.5";
        }, 2500);
    }).catch(err => {
        console.error('Errore nel copia:', err);
    });
}
