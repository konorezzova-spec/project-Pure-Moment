import SLBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const categories = document.querySelector('.portfolio-categories');
const gallery = document.querySelector('.portfolio-gallery');

const categoryButtons = document.getElementsByClassName('portfolio-category-btn');
const loadMoreButton = document.querySelector('.portfolio-load-more');
const loader = document.querySelector('.loader');

const lightbox = new SLBox(".portfolio-gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

let likeButton = null;
const STORAGE_KEY = 'wishList';
const likes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let initialized = false;

export function createCategoryButtons(categoriesData) {
  const markup = categoriesData.map(category => {
    return `<li><button class="portfolio-category-btn" data-id="${category._id}" aria-label="${category.category}">${category.category}</button></li>`;
  });
  categories.insertAdjacentHTML('beforeend', markup.join(''));
}

function createGalleryItems({ img, title }) {
  return `<li class="portfolio-gallery-item"><a href="${img}" data-lightbox="gallery"><img class="portfolio-img"src="${img}" alt="${title}" loading="lazy" decoding="async"></a>
  </li>`;
 }

export function createGallery(itemsData) {
  const markup = itemsData.map(item => {
    return createGalleryItems(item);
  });
  gallery.insertAdjacentHTML('beforeend', markup.join(''));
  
  lightbox.refresh();
 
  if (!initialized) {
    initLightboxLikeButton();
    initialized = true;
  }
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

export function setActiveCategoryButton(categoryId) {

  for (const button of categoryButtons) {
   
    if (button.dataset.id === categoryId) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }
}

//////
function getCurrentImage() {
  return document.querySelector('.sl-image img');
}

function isLiked(src) {
  return likes.includes(src);
}

function saveLikes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
}

function toggleLike(src) {
  const index = likes.indexOf(src);

  if (index === -1) {
    likes.push(src);
  } else {
    likes.splice(index, 1);
  }

  saveLikes();
}

function updateLikeButton() {
  if (!likeButton) return;

  const img = getCurrentImage();

  if (!img) return;

  likeButton.classList.toggle('liked', isLiked(img.src));
}

function initLightboxLikeButton() {

  lightbox.on('shown.simplelightbox', () => {
    const wrapper = document.querySelector('.sl-wrapper');

    if (!likeButton) {
      likeButton = document.createElement('button');
      likeButton.className = 'sl-portfolio-heart-btn';

      likeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="32"
             height="32"
             viewBox="0 0 24 24"
             fill="currentColor"
             stroke="var(--color-curious-blue)"
             stroke-width="1.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                   2 5.42 4.42 3 7.5 3
                   c1.74 0 3.41.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3
                   19.58 3 22 5.42 22 8.5
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      `;

      likeButton.addEventListener('click', () => {
        const img = getCurrentImage();

        if (!img) return;

        toggleLike(img.src);
        updateLikeButton();
      });
    }

    if (!wrapper.contains(likeButton)) {
      wrapper.append(likeButton);
    }

    updateLikeButton();
  });

  lightbox.on('changed.simplelightbox', updateLikeButton);
}

export function lightboxLikeButton() {
  initialized = false; // Reset the initialized flag when loading more items
}
