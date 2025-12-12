// Grab the DOM elements we care about
const viewport = document.getElementById('viewport');
const canvas = document.getElementById('canvas');

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

// MOUSE EVENTS
viewport.addEventListener('mousedown', (event) => {
  isDragging = true;
  viewport.style.cursor = 'grabbing';

  // Save where the mouse started relative to current offset
  startX = event.clientX - currentX;
  startY = event.clientY - currentY;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  viewport.style.cursor = 'grab';
});

window.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  // New offset = current mouse - start mouse
  currentX = event.clientX - startX;
  currentY = event.clientY - startY;

  updateTransform();
});

// TOUCH EVENTS (for trackpad / mobile)
viewport.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  isDragging = true;

  startX = touch.clientX - currentX;
  startY = touch.clientY - currentY;
}, { passive: true });

window.addEventListener('touchend', () => {
  isDragging = false;
});

window.addEventListener('touchmove', (event) => {
  if (!isDragging) return;

  const touch = event.touches[0];

  currentX = touch.clientX - startX;
  currentY = touch.clientY - startY;

  updateTransform();
}, { passive: true });

// For your own sanity: check that the script runs
console.log('P3.js loaded – drag the field!');
