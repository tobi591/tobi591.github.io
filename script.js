const photos = [
  [17, 'Unser Foodtrailer unter der Weide'],
  [6, 'Bubblewaffel mit Softeis und Toppings'],
  [12, 'Der Trailer im Grünen'],
  ...[1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16].map(number => [number, 'Einblicke in unseren Foodtrailer'])
];
const gallery = document.getElementById('lightbox');
const photo = document.getElementById('lightbox-image');
let current = 0;
let trigger;
function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  photo.src = `bilder/trailer${photos[current][0]}.jpg`;
  photo.alt = photos[current][1];
  document.getElementById('photo-caption').textContent = photos[current][1];
  document.getElementById('photo-count').textContent = `${current + 1} / ${photos.length}`;
}
function openGallery(index, opener) {
  trigger = opener;
  showPhoto(index);
  gallery.showModal();
  document.body.classList.add('gallery-open');
}
if (typeof gallery.showModal === 'function') {
  const allPhotos = document.getElementById('all-photos');
  allPhotos.hidden = false;
  allPhotos.addEventListener('click', () => openGallery(0, allPhotos));
  document.querySelectorAll('.gallery-item').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      openGallery(Number(link.dataset.index), link);
    });
  });
}
document.getElementById('close-gallery').addEventListener('click', () => gallery.close());
document.getElementById('previous-photo').addEventListener('click', () => showPhoto(current - 1));
document.getElementById('next-photo').addEventListener('click', () => showPhoto(current + 1));
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
gallery.addEventListener('click', event => {
  const rect = gallery.getBoundingClientRect();
  if (event.target === gallery && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) gallery.close();
});
gallery.addEventListener('close', () => {
  document.body.classList.remove('gallery-open');
  trigger?.focus();
});
