// 1. Animación en botones al hacer hover (agrega clase animada)
document.querySelectorAll('.boton1, .boton2').forEach(boton => {
    boton.addEventListener('mouseover', () => {
        boton.style.transform = 'scale(1.1)';
        boton.style.transition = 'transform 0.3s ease';
    });
    boton.addEventListener('mouseout', () => {
        boton.style.transform = 'scale(1)';
    });
});

// 2. Popup al cargar
window.addEventListener('DOMContentLoaded', () => {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div style="position:fixed;top:20px;right:20px;background:white;color:#003366;
                    padding:1rem 2rem;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.2);
                    z-index:9999;">
            🎉 ¡Bienvenido a nuestra página de seguros!
            <button id="cerrarPopup" style="margin-left:10px;background:#003366;color:white;
                    border:none;padding:0.3rem 0.6rem;border-radius:5px;cursor:pointer;">
                X
            </button>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('cerrarPopup').addEventListener('click', () => {
        popup.remove();
    });
});

// 3. Botón de WhatsApp flotante
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/573108844672'; // cambia por tu número
whatsappBtn.target = '_blank';
whatsappBtn.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="Numero WhatsApp"
         style="width:60px;height:60px;">
`;
whatsappBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    animation: pulse 1.5s infinite;
`;
document.body.appendChild(whatsappBtn);

// 4. Animación de pulso con CSS (insertamos dinámicamente)
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carrusel-track');
  const carrusel = document.querySelector('.carrusel-companias');

  // Detener animación al pasar el mouse
  carrusel.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  carrusel.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });

  // Swipe en móviles
  let startX = 0;
  let isDown = false;

  track.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX;
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const walk = x - startX;
    track.scrollLeft -= walk;
    startX = x;
  });

  track.addEventListener('touchend', () => {
    isDown = false;
    track.style.animationPlayState = 'running';
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.numero');
  const speed = 50; // menor = más rápido

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-numero');
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };

    // Inicia solo cuando el contador entra en pantalla
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(counter);
      }
    }, { threshold: 1 });

    observer.observe(counter);
  });
});