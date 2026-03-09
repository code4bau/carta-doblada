const container = document.getElementById('card-container');
let isDragging = false;

// 1. Iniciar posición en el centro
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;

// 2. Movimiento por acelerómetro (Inercia)
window.addEventListener('deviceorientation', (event) => {
    if (isDragging) return;

    // Movimiento sutil basado en la inclinación
    let tiltX = event.gamma * 1.5; // Izquierda/Derecha
    let tiltY = event.beta * 1.5;  // Arriba/Abajo

    container.style.transform = `translate(calc(-50% + ${tiltX}px), calc(-50% + ${tiltY}px)) rotate(${tiltX * 0.2}deg)`;
});

// 3. Arrastre con el dedo
container.addEventListener('touchstart', (e) => {
    isDragging = true;
});

container.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    currentX = touch.clientX;
    currentY = touch.clientY;

    container.style.left = currentX + 'px';
    container.style.top = currentY + 'px';

    // TRIGGER DE SALIDA: Si el dedo toca el borde izquierdo
    if (currentX < 60) {
        exitCard();
    }
});

container.addEventListener('touchend', () => {
    isDragging = false;
});

function exitCard() {
    container.classList.add('exit-left');

    // Feedback táctil
    if (navigator.vibrate) navigator.vibrate(30);

    // Reset automático para practicar
    setTimeout(() => {
        container.classList.remove('exit-left');
        container.style.left = '50%';
        container.style.top = '50%';
    }, 2500);
}