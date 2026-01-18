(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Respeita preferências de acessibilidade
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d', { alpha: true });

  const glyphs = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+';
  let cols = 0;
  let drops = [];
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fontSize = 14;
    cols = Math.floor(window.innerWidth / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * 60));
  }

  function draw() {
    // rastro
    ctx.fillStyle = 'rgba(4, 7, 11, 0.12)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const fontSize = 14;
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];

      // alterna tons ciano/magenta discretos
      const tint = (i % 12 === 0) ? 'rgba(255, 61, 240, 0.75)' : 'rgba(39, 246, 255, 0.72)';
      ctx.fillStyle = tint;
      ctx.fillText(ch, x, y);

      if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(draw);
})();
