import { getPortfolioItemsCategories, getPortfolioGallery } from './portfolio-api.js';
import { createCategoryButtons, createGallery, clearGallery, showLoadMoreBtn, hideLoadMoreBtn, showLoader, hideLoader, setActiveCategoryButton } from './portfolio-render.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const portfolioGallery = document.querySelector('.portfolio-gallery');
const categoryButtonsContainer = document.querySelector('.portfolio-categories');
const loadMoreButton = document.querySelector('.portfolio-load-more');

const categories = document.querySelector('.portfolio-categories');

let currentCategoryId = '';
let currentPage = 1;
let loadedItemsCount = 0;

categoryButtonsContainer.addEventListener('click', handleCategoryClick);
loadMoreButton.addEventListener('click', handleLoadMoreItems);

document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio();
  loadGallery(currentPage, 9);
  currentPage +=2;
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
    loadGallery(currentPage, 9, currentCategoryId);
    currentPage += 2;
  }
};

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
    
    checkLoadedItemsCount(galleryItems.totalItems, loadedItemsCount);

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
  currentPage += 1;
  loadGallery(currentPage, 3, currentCategoryId);
}

function checkLoadedItemsCount(totalItems, loadedItemsCount) {
    if (loadedItemsCount >= totalItems) {
    hideLoadMoreBtn();
   
  } else {
    showLoadMoreBtn();
  }
}