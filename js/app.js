const container = document.getElementById('card-container');
const card = document.getElementById('folded-card');

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let isDragging = false;

// 1. Movimiento por Inclinación (Giroscopio)
window.addEventListener('deviceorientation', (event) => {
    if (isDragging) return;

    // Calculamos leve movimiento según la inclinación del celu
    let tiltX = event.gamma * 2; // Inclinación lateral
    let tiltY = event.beta * 2;  // Inclinación frontal

    container.style.transform = `translate(calc(-50% + ${tiltX}px), calc(-50% + ${tiltY}px))`;
});

// 2. Movimiento por Arrastre (Touch)
container.addEventListener('touchstart', () => isDragging = true);
container.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    posX = touch.clientX;
    posY = touch.clientY;

    container.style.left = posX + 'px';
    container.style.top = posY + 'px';

    // TRIGGER DE SALIDA: Si llegamos al borde izquierdo (menos de 50px)
    if (posX < 60) {
        exitCard();
    }
});
container.addEventListener('touchend', () => isDragging = false);

function exitCard() {
    container.classList.add('exit-left');
    if (navigator.vibrate) navigator.vibrate(20);

    // Resetear después de 2 segundos por si querés repetir
    setTimeout(() => {
        container.classList.remove('exit-left');
        container.style.left = '50%';
        container.style.top = '50%';
        container.style.opacity = '1';
    }, 2000);
}