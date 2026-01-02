// MODIFICA QUI LA DATA
const dataMatrimonio = '2026-08-29T16:00:00';

function updateCountdown() {
    const target = new Date(dataMatrimonio).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    const countdownContainer = document.getElementById('countdown');

    if (diff < 0) {
        countdownContainer.innerHTML = "<h3 style='font-size: 2rem;'>Oggi è il grande giorno!</h3>";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Helper per aggiungere lo zero davanti
    const format = (num) => num < 10 ? `0${num}` : num;

    // Check if elements exist before updating (for safety)
    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');

    if (dEl) dEl.innerText = format(days);
    if (hEl) hEl.innerText = format(hours);
    if (mEl) mEl.innerText = format(minutes);
}

// Aggiorna ogni minuto (dato che non mostriamo i secondi)
setInterval(updateCountdown, 60000);
updateCountdown(); // Run immediato

// IBAN Copy Function
function copyIBAN() {
    const ibanText = document.getElementById('iban-code').innerText;
    navigator.clipboard.writeText(ibanText).then(() => {
        const tooltip = document.getElementById('copy-tooltip');
        tooltip.innerText = "Copiato!";
        tooltip.style.color = "#d4a574";
        setTimeout(() => {
            tooltip.innerText = "Copia";
            tooltip.style.color = "#b0b0b0";
        }, 2000);
    }).catch(err => {
        console.error('Errore nella copia: ', err);
    });
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach((el) => {
    observer.observe(el);
});

// Smooth Scroll for Nav Links (Optional reinforcement as CSS handle most of it)
document.querySelectorAll('.nav-links a, .back-to-top').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for sticky nav height
                    behavior: 'smooth'
                });
            }
        }
    });
});
