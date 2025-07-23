const messages = [
    "creo que te equivocaste de boton JAHSJ",
    "si o miedo al exito miamor?",
    "esta bien dejare de preguntar",
    "es broma, di que si profavor :(",
    "solo pica el otro boton "
]
let mesaggeindex = 0;

function handleNoClick(){
    const noBtn = document.querySelector(".no-btn");
    const yesBtn = document.querySelector(".yes-btn");

    //no
    noBtn.textContent = messages[mesaggeindex];
    mesaggeindex = (mesaggeindex + 1) % messages.length;

    //yes
    const currenSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const newSize = currenSize * 2;
    yesBtn.style.fontSize = `${newSize}px`;

    //animation
    yesBtn.style.transform = "scale(1.5)";
    yesBtn.style.transition = "transform 0.3s ease";

    //reset
    setTimeout(() => {
        yesBtn.style.transform = "scale(1)";
        yesBtn.style.transition = "transform 0.3s ease";
    }, 100);
}

function handleYesClick(){
    window.location.href = "./yes.html";
}

// Función para crear partículas que caen
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria en el ancho de la pantalla
    particle.style.left = Math.random() * 100 + 'vw';
    
    // Duración aleatoria de la animación (entre 4 y 10 segundos para que sean más visibles)
    const duration = Math.random() * 6 + 4;
    particle.style.animationDuration = duration + 's';
    
    // Retraso aleatorio para que no todas caigan al mismo tiempo
    particle.style.animationDelay = Math.random() * 1 + 's';
    
    document.body.appendChild(particle);
    
    // Remover la partícula después de que termine la animación
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + 2) * 1000);
}

// Crear partículas cada cierto tiempo
function startParticles() {
    // Crear una partícula cada 400ms (más frecuente)
    setInterval(createParticle, 400);
    
    // Crear algunas partículas iniciales
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 150);
    }
}


// Función para crear explosión de partículas cuando se hace clic en "Sí"
function createParticleExplosion() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'fixed';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.width = '12px';
            particle.style.height = '12px';
            particle.style.zIndex = '1001';
            
            // Colores especiales para la celebración
            const colors = [
                'rgba(255, 215, 0, 0.9)',    // Dorado
                'rgba(255, 20, 147, 0.9)',   // Rosa intenso
                'rgba(0, 255, 127, 0.9)',    // Verde lima
                'rgba(255, 69, 0, 0.9)',     // Naranja
                'rgba(138, 43, 226, 0.9)'    // Violeta
            ];
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = `radial-gradient(circle, ${color} 0%, ${color}80 50%, ${color}40 100%)`;
            particle.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}40`;
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 200 + Math.random() * 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.style.animation = `explode 2s ease-out forwards`;
            particle.style.setProperty('--vx', vx + 'px');
            particle.style.setProperty('--vy', vy + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle && particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }, i * 50);
    }
}

// Agregar animación de explosión al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Iniciar las partículas cuando se carga la página
document.addEventListener('DOMContentLoaded', startParticles);


