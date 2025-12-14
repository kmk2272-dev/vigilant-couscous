document.addEventListener('DOMContentLoaded', () => {
  // Grab the DOM elements we care about
  const viewport = document.getElementById('viewport');
  const canvas = document.getElementById('canvas');
  const label = document.getElementById('hover-label');
  const tiles = document.querySelectorAll('.tri');

  // State for dragging
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  // Apply the translate transform to the canvas
  function updateTransform() {
    canvas.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }

  // ---------- DRAG: MOUSE ----------

  viewport.addEventListener('mousedown', (event) => {
    // stop browser from starting an image drag / text selection
    event.preventDefault();

    isDragging = true;
    viewport.style.cursor = 'grabbing';

    startX = event.clientX - currentX;
    startY = event.clientY - currentY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    viewport.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    currentX = event.clientX - startX;
    currentY = event.clientY - startY;

    updateTransform();
  });

  // ---------- DRAG: TOUCH / TRACKPAD ----------

  viewport.addEventListener('touchstart', (event) => {
    // allow us to prevent the default scroll/drag
    event.preventDefault();

    const touch = event.touches[0];
    isDragging = true;

    startX = touch.clientX - currentX;
    startY = touch.clientY - currentY;
  }, { passive: false });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (event) => {
    if (!isDragging) return;

    event.preventDefault();

    const touch = event.touches[0];

    currentX = touch.clientX - startX;
    currentY = touch.clientY - startY;

    updateTransform();
  }, { passive: false });

  // ---------- HOVER LABEL + RANDOM ROTATION ----------

  tiles.forEach(tile => {
    // random angle between -50° and +10° (your current choice)
    const angle = (Math.random() * 60) - 50;
    tile.style.setProperty('--blob-rot', `${angle}deg`);

    // hover label
    tile.addEventListener('mouseenter', () => {
      if (!label) return;
      const title = tile.dataset.title || '';
      if (title) {
        label.textContent = title;
        label.style.opacity = '1';
      } else {
        label.style.opacity = '0';
      }
    });

    tile.addEventListener('mouseleave', () => {
      if (!label) return;
      label.style.opacity = '0';
    });
  });

  console.log('P3.js loaded – drag the field!');
});
