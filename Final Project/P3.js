document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('viewport');
  const canvas   = document.getElementById('canvas');
  const label    = document.getElementById('hover-label');
  const tiles    = document.querySelectorAll('.tri');

  // FILTER BUTTONS
  const filterButtons = document.querySelectorAll('.filter-btn');

  // --- DETAIL OVERLAY ELEMENTS ---
  const overlay      = document.getElementById('detail-overlay');
  const detailImg    = document.getElementById('detail-img');
  const detailTitle  = document.getElementById('detail-title');
  const detailBlurb  = document.getElementById('detail-blurb');
  const detailClose  = document.querySelector('.detail-close');

  // --- PAN STATE ---
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  // --- ZOOM STATE ---
  let zoom = 1;
  const MIN_ZOOM  = 0.4;
  const MAX_ZOOM  = 2.5;
  const ZOOM_STEP = 0.01;

  function updateTransform() {
    if (!canvas) return;
    canvas.style.transform = `translate(${currentX}px, ${currentY}px) scale(${zoom})`;
  }

  // ----- DRAG MOUSE -----
  if (viewport) {
    viewport.addEventListener('mousedown', (event) => {
      // don't start dragging if user clicked inside the open overlay
      if (overlay && overlay.classList.contains('open')) return;

      event.preventDefault();
      isDragging = true;
      viewport.style.cursor = 'grabbing';

      startX = event.clientX - currentX;
      startY = event.clientY - currentY;
    });

    viewport.addEventListener('wheel', (event) => {
      // don't zoom when overlay is open
      if (overlay && overlay.classList.contains('open')) return;

      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : -1;
      zoom += direction * ZOOM_STEP;

      if (zoom < MIN_ZOOM) zoom = MIN_ZOOM;
      if (zoom > MAX_ZOOM) zoom = MAX_ZOOM;

      updateTransform();
    }, { passive: false });

    viewport.addEventListener('touchstart', (event) => {
      if (overlay && overlay.classList.contains('open')) return;

      event.preventDefault();
      const touch = event.touches[0];
      isDragging = true;

      startX = touch.clientX - currentX;
      startY = touch.clientY - currentY;
    }, { passive: false });
  }

  window.addEventListener('mouseup', () => {
    isDragging = false;
    if (viewport) viewport.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    currentX = event.clientX - startX;
    currentY = event.clientY - startY;
    updateTransform();
  });

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

  // ----- HOVER LABEL + RANDOM ROTATION + DBLCLICK DETAIL -----
  tiles.forEach(tile => {
    // random angle for desk scatter
    const angle = (Math.random() * 60) - 30;
    tile.style.setProperty('--blob-rot', `${angle}deg`);

    // hover label in corner
    if (label) {
      tile.addEventListener('mouseenter', () => {
        const title = tile.dataset.title || '';
        if (title) {
          label.textContent = title;
          label.style.opacity = '1';
        } else {
          label.style.opacity = '0';
        }
      });

      tile.addEventListener('mouseleave', () => {
        label.style.opacity = '0';
      });
    }

    // DBLCLICK: open detail panel
    tile.addEventListener('dblclick', (event) => {
      if (!overlay) return;
      event.stopPropagation();

      const img   = tile.querySelector('img');
      const title = tile.dataset.title || img?.alt || '';
      const blurb = tile.dataset.blurb || 'Sketch notes coming soon.';

      if (img) {
        detailImg.src = img.src;
        detailImg.alt = img.alt || title;
      }
      detailTitle.textContent = title;
      detailBlurb.textContent = blurb;

      overlay.classList.add('open');
    });
  });

  // ----- CLOSE DETAIL PANEL -----
  if (detailClose && overlay) {
    detailClose.addEventListener('click', () => {
      overlay.classList.remove('open');
    });

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  }

  // ---------- FILTERING BY TYPE (plan / section / perspective / detail) ----------
  let currentFilter = 'all';

  
  function applyFilter(category) {
  currentFilter = category;

  tiles.forEach(tile => {
    const type = tile.dataset.type || null;

    // reset first
    tile.classList.remove('is-dim');

    if (category === 'all') {
      // show everything normally
      return;
    }

    // if tile has no type or type doesn't match -> dim it
    if (!type || type !== category) {
      tile.classList.add('is-dim');
    }
  });

  // -------- BACKGROUND COLOR PER FILTER --------
  if (!canvas) return;

  switch (category) {
    case 'plan':
      canvas.style.backgroundColor = '#e3f3ff'; // light blue
      break;
    case 'section':
      canvas.style.backgroundColor = '#ffe4e1'; // soft red / coral
      break;
    case 'perspective':
      canvas.style.backgroundColor = '#f2e7ff'; // lavender
      break;
    case 'axon':
      canvas.style.backgroundColor = '#e6ffed'; // pale green
      break;
    case 'all':
    default:
      canvas.style.backgroundColor = '#fdfdfd'; // neutral default
      break;
  }
}


  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter; // "all", "plan", "section", ...

      // update button active style
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      applyFilter(category);
    });
  });

  // set initial transform + filter
  updateTransform();
  applyFilter('all');

  console.log('P3.js loaded – drag, zoom, filter, and open details!');
});
