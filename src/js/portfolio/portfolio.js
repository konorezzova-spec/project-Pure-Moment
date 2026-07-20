import {
  getPortfolioItemsCategories,
  getPortfolioGallery,
} from './portfolio-api.js';
import {
  createCategoryButtons,
  createGallery,
  clearGallery,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showLoader,
  hideLoader,
  setActiveCategoryButton,
  lightboxLikeButton,
} from './portfolio-render.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const portfolioGallery = document.querySelector('.portfolio-gallery');
const categoryButtonsContainer = document.querySelector(
  '.portfolio-categories'
);
const loadMoreButton = document.querySelector('.portfolio-load-more');
const favourits = document.querySelector('.favourits');

const categories = document.querySelector('.portfolio-categories');

let currentCategoryId = '';
let currentPage = 1;
let loadedItemsCount = 0;
let totalItems = 0;
const itemsPerPage = 9;
const loadMoreItemsPerPage = 3;
const STORAGE_KEY = 'wishList';

categoryButtonsContainer.addEventListener('click', handleCategoryClick);
loadMoreButton.addEventListener('click', handleLoadMoreItems);
favourits.addEventListener('click', handlFavourits);

document.addEventListener('DOMContentLoaded', () => {
  initializePortfolio();
  loadGallery(currentPage, itemsPerPage);
});

async function handleCategoryClick(event) {
  event.preventDefault();
  if (event.target.tagName === 'BUTTON') {
    const categoryId = event.target.dataset.id || '';
    currentCategoryId = categoryId;
    currentPage = 1;
    loadedItemsCount = 0;

    setActiveCategoryButton(categoryId);
    clearGallery();
    lightboxLikeButton(); // Reset the initialized flag when changing categories
    loadGallery(currentPage, itemsPerPage, currentCategoryId);
  }
}

async function initializePortfolio() {
  try {
    const categories = await getPortfolioItemsCategories();

    createCategoryButtons(categories);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Error initializing portfolio:',
      position: 'topRight',
    });
  }
}

async function loadGallery(page, limit, categoryId = '') {
  showLoader();

  try {
    const galleryItems = await getPortfolioGallery(page, limit, categoryId);

    createGallery(galleryItems.weddingPhotos);

    loadedItemsCount += limit;
    totalItems = galleryItems.totalItems;

    checkLoadedItemsCount(galleryItems.totalItems, loadedItemsCount);

    setProgress();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }

  hideLoader();
}

function handleLoadMoreItems(event) {
  event.preventDefault();
  currentPage = Math.floor(loadedItemsCount / loadMoreItemsPerPage) + 1;
  lightboxLikeButton();
  loadGallery(currentPage, loadMoreItemsPerPage, currentCategoryId);
}

function checkLoadedItemsCount(totalItems, loadedItemsCount) {
  if (loadedItemsCount >= totalItems) {
    hideLoadMoreBtn();
  } else {
    showLoadMoreBtn();
  }
}

// function Progres() {
//   const progresBar = document.querySelector('.progres-loaded');
//   console.log(progresBar);
//   // progresBar.value = loadedItemsCount / totalItems * 100;
//  }
const progresBar = document.querySelector('.progres-loaded');

function handlFavourits() {
  setActiveCategoryButton();
  favourits.classList.add('active');
  progresBar.classList.add('hidden');
  clearGallery();
  hideLoadMoreBtn();
  const wishList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (wishList.length > 0) {
    createGallery(wishList);
  } else {
    iziToast.info({
      title: 'info',
      message: 'Empty',
      position: 'center',
    });
  }
  lightboxLikeButton();
}

function setProgress() {
  const v = (loadedItemsCount / totalItems) * 100;
  progresBar.value = v;
  if (loadedItemsCount >= totalItems) {
    progresBar.classList.add('hidden');
  } else {
    progresBar.classList.remove('hidden');
  }
}
