document.querySelectorAll('.materia').forEach(materia => {
  materia.addEventListener('click', () => {
    if (materia.classList.contains('bloqueada')) return;

    materia.classList.toggle('aprobada');
    actualizarBloqueos();
  });
});

function actualizarBloqueos() {
  const aprobadas = new Set(
    [...document.querySelectorAll('.materia.aprobada')].map(m => m.dataset.id)
  );

  document.querySelectorAll('.materia').forEach(materia => {
    const requisitos = materia.dataset.correlativas.split('-').filter(Boolean);
    const habilitada = requisitos.every(req => aprobadas.has(req));

    if (requisitos.length > 0 && !habilitada) {
      materia.classList.add('bloqueada');
      materia.classList.remove('aprobada');
    } else {
      materia.classList.remove('bloqueada');
    }
  });
}

actualizarBloqueos();
