import SLBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const categories = document.querySelector('.portfolio-categories');
const gallery = document.querySelector('.portfolio-gallery');

const loadMoreButton = document.querySelector('.portfolio-load-more');
const loader = document.querySelector('.loader');

const lightbox = new SLBox(".portfolio-gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createCategoryButtons(categoriesData) {
  const markup = categoriesData.map(category => {
    return `<li><button class="portfolio-category-btn" data-id="${category._id}">${category.category}</button></li>`;
  });
  categories.insertAdjacentHTML('beforeend', markup.join(''));
}

function createGalleryItems({ img, title }) {
  return `<li class="portfolio-gallery-item"><a href="${img}" data-lightbox="gallery"><img class="portfolio-img"src="${img}" alt="${title}"></a></li>`;
 }

export function createGallery(itemsData) {
  const markup = itemsData.map(item => {
    return createGalleryItems(item);
  });
  gallery.insertAdjacentHTML('beforeend', markup.join(''));
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove("hidden");
}

export function hideLoader() {
  loader.classList.add("hidden");
}

export function showLoadMoreBtn() {
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreBtn() {
  loadMoreButton.classList.add('hidden');
}