const backdrop = document.querySelector('[data-modal]');
const openBtn = document.querySelector('[data-modal-open]');
const closeBtn = document.querySelector('[data-modal-close]');

function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', handleEscKey);
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';

  document.removeEventListener('keydown', handleEscKey);
}

function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

if (openBtn) {
  openBtn.addEventListener('click', openModal);
}

closeBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

export { openModal, closeModal };