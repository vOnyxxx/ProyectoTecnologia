const contadorClientes = document.getElementById("contadorClientes");
let numeroClientes = 0;
const totalClientes = 300;
const velocidadClientes = 15;

const animarClientes = setInterval(() => {
  if (numeroClientes < totalClientes) {
    numeroClientes++;
    contadorClientes.textContent = numeroClientes;
  } else {
    clearInterval(animarClientes);
  }
}, velocidadClientes);

// Contador animado de años de experiencia
const contadorAnios = document.getElementById("contadorAnios");
let numeroAnios = 0;
const totalAnios = 25;
const velocidadAnios = 100;

const animarAnios = setInterval(() => {
  if (numeroAnios < totalAnios) {
    numeroAnios++;
    contadorAnios.textContent = numeroAnios;
  } else {
    clearInterval(animarAnios);
  }
}, velocidadAnios);

document.getElementById("botonAyuda").addEventListener("click", function() {
    alert("Hola 👋 ¿En qué podemos ayudarte?");
});

function toggleServicios() {
    const menu = document.getElementById('submenuServicios');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Cerrar si se hace clic fuera
window.addEventListener('click', function(e) {
    const submenu = document.getElementById('submenuServicios');
    const button = document.querySelector('.menu button');
    if (!submenu.contains(e.target) && !button.contains(e.target)) {
        submenu.style.display = 'none';
    }
});