document.addEventListener('DOMContentLoaded', () => {
  const track    = document.querySelector('.tira');
  const dotsWrap = document.querySelector('.dots');
  const prev     = document.getElementById('prev');
  const next     = document.getElementById('next');

  if (!track || !dotsWrap || !prev || !next) {
    console.warn('Carousel: faltan nodos (.tira, .dots, #prev o #next)');
    return;
  }

  // Tomamos las imágenes que ya pusiste en el HTML
  const slides = Array.from(track.querySelectorAll('img'));
  if (slides.length === 0) {
    console.warn('Carousel: no hay imágenes dentro de .tira');
    return;
  }

  // Crear puntitos (uno por imagen)
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  let index = 0;

  function updateUI() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function goTo(i) {
    index = (i + slides.length) % slides.length;
    updateUI();
  }

  // Controles
  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));

  // Teclado
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  });

  // Auto-rotación
  setInterval(() => goTo(index + 1), 4000);

  // Estado inicial
  updateUI();
});
