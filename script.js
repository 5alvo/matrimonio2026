// 1. Cursore
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Countdown
const weddingDate = new Date("Aug 29, 2026 16:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    if (diff > 0) {
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000); 
updateCountdown();

// 3. Scroll Logic
const nav = document.getElementById('mainNav');
const reveals = document.querySelectorAll('.section-reveal');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) el.classList.add('active');
    });
});

// 4. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// 5. Copia IBAN
function copyIBAN() {
    const iban = document.getElementById('iban-code').innerText;
    const status = document.getElementById('copy-status');
    navigator.clipboard.writeText(iban).then(() => {
        status.style.opacity = "0";
        setTimeout(() => {
            status.innerText = "IBAN COPIATO";
            status.style.opacity = "1";
            status.style.fontWeight = "600";
        }, 300);
        setTimeout(() => {
            status.style.opacity = "0";
            setTimeout(() => {
                status.innerText = "Tocca per copiare solo l'IBAN";
                status.style.opacity = "0.5";
                status.style.fontWeight = "400";
            }, 300);
        }, 3000);
    });
}
