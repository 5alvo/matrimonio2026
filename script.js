const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

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
setInterval(updateCountdown, 1000); updateCountdown();

const nav = document.getElementById('mainNav');
const reveals = document.querySelectorAll('.section-reveal');
const scrollInd = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
        scrollInd.style.opacity = '0'; // Sparisce quando l'utente inizia a scorrere
    } else {
        nav.classList.remove('scrolled');
        scrollInd.style.opacity = '1';
    }

    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) el.classList.add('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: document.querySelector(this.getAttribute('href')).offsetTop - 70, behavior: 'smooth' });
    });
});

function copyIBAN() {
    const iban = document.getElementById('iban-code').innerText;
    const status = document.getElementById('copy-status');
    navigator.clipboard.writeText(iban).then(() => {
        status.style.opacity = "0";
        setTimeout(() => { status.innerText = "IBAN COPIATO"; status.style.opacity = "1"; }, 300);
        setTimeout(() => { status.style.opacity = "0"; setTimeout(() => { status.innerText = "Tocca per copiare solo l'IBAN"; status.style.opacity = "0.5"; }, 300); }, 3000);
    });
}
