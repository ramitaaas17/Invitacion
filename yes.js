// Función para crear fuegos artificiales
function createFirework() {
    const colors = [
        'rgba(255, 105, 180, 0.9)',  // Rosa más intenso
        'rgba(186, 85, 211, 0.9)',   // Violeta más vibrante
        'rgba(135, 206, 250, 0.9)',  // Azul más brillante
        'rgba(255, 165, 0, 0.9)',    // Naranja vibrante
        'rgba(255, 215, 0, 0.9)',    // Dorado brillante
        'rgba(50, 205, 50, 0.9)',    // Verde lima más intenso
        'rgba(255, 20, 147, 0.9)',   // Rosa fucsia
        'rgba(138, 43, 226, 0.9)'    // Púrpura intenso
    ];
    
    // Posición aleatoria en la pantalla (evitando los bordes)
    const x = Math.random() * (window.innerWidth - 200) + 100;
    const y = Math.random() * (window.innerHeight - 200) + 100;
    
    // Crear el punto central de explosión
    const center = document.createElement('div');
    center.style.position = 'fixed';
    center.style.left = x + 'px';
    center.style.top = y + 'px';
    center.style.width = '6px';
    center.style.height = '6px';
    center.style.borderRadius = '50%';
    center.style.background = colors[Math.floor(Math.random() * colors.length)];
    center.style.zIndex = '1';
    center.style.pointerEvents = 'none';
    
    document.body.appendChild(center);
    
    // Crear partículas que salen del centro
    const particleCount = 12 + Math.random() * 10; // Entre 12 y 22 partículas
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '5px';
            particle.style.height = '5px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 12px ${color}, 0 0 24px ${color}40`;
            
            // Dirección aleatoria
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 80 + Math.random() * 60; // Velocidad más rápida
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            // Aplicar animación
            particle.style.animation = 'fireworkParticle 2.5s ease-out forwards';
            particle.style.setProperty('--vx', vx + 'px');
            particle.style.setProperty('--vy', vy + 'px');
            
            document.body.appendChild(particle);
            
            // Limpiar partícula
            setTimeout(() => {
                if (particle && particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2500);
        }, i * 30); // Pequeño retraso entre partículas para efecto más suave
    }
    
    // Limpiar centro
    setTimeout(() => {
        if (center && center.parentNode) {
            center.parentNode.removeChild(center);
        }
    }, 100);
}

// Función para crear múltiples fuegos artificiales
function createFireworkShow() {
    const fireworkCount = 4 + Math.random() * 5; // Entre 4 y 9 fuegos artificiales
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createFirework();
        }, i * (150 + Math.random() * 250)); // Más frecuentes
    }
}

// Agregar estilos CSS para las animaciones
const fireworkStyles = document.createElement('style');
fireworkStyles.textContent = `
    @keyframes fireworkParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.9;
        }
        50% {
            opacity: 0.7;
            transform: translate(calc(var(--vx) * 0.7), calc(var(--vy) * 0.7)) scale(1.2);
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0.3);
            opacity: 0;
        }
    }
    
    .firework-particle {
        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;
document.head.appendChild(fireworkStyles);

// Iniciar el espectáculo de fuegos artificiales cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Primer show inmediato
    setTimeout(createFireworkShow, 500);
    
    // Shows periódicos cada 3-6 segundos
    function scheduleNextShow() {
        const delay = 3000 + Math.random() * 3000; // Entre 3 y 6 segundos
        setTimeout(() => {
            createFireworkShow();
            scheduleNextShow(); // Programar el siguiente
        }, delay);
    }
    
    scheduleNextShow();
});