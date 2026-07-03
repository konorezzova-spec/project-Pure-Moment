import { getPortfolioItemsCategories, getPortfolioGallery } from './portfolio-api.js';
import { createCategoryButtons, createGallery, clearGallery, showLoadMoreBtn, hideLoadMoreBtn, showLoader, hideLoader } from './portfolio-render.js';

const portfolioGallery = document.querySelector('.portfolio-gallery');
const categoryButtonsContainer = document.querySelector('.portfolio-categories');
const loadMoreButton = document.querySelector('.portfolio-load-more');

const categories = document.querySelector('.portfolio-categories');

let currentCategoryId = '';
let currentPage = 1;
let loadedItemsCount = 0;

categoryButtonsContainer.addEventListener('click', handleCategoryClick);
loadMoreButton.addEventListener('click', handleLoadMoreItems);

initializePortfolio();
loadGallery(1, 9);

async function handleCategoryClick(event) {
  event.preventDefault();
  if (event.target.tagName === 'BUTTON') {
    const categoryId = event.target.dataset.id || '';
    currentCategoryId = categoryId;
    currentPage = 1;
    loadedItemsCount = 0;

    clearGallery();
    loadGallery(currentPage, 9, currentCategoryId);
    
  }
};

async function initializePortfolio() {
  try {
    const categories = await getPortfolioItemsCategories();
  
    createCategoryButtons(categories);
  } catch (error) {
    console.error("Error initializing portfolio:", error);
  }
}

async function loadGallery(page, limit, categoryId = '') {
  try {
    const galleryItems = await getPortfolioGallery(page, limit, categoryId);
    
    createGallery(galleryItems.weddingPhotos);

    loadedItemsCount += limit;
    
    checkLoadedItemsCount(galleryItems.totalItems, loadedItemsCount);

  } catch (error) {
    console.error("Error loading gallery:", error);
  }
}

function handleLoadMoreItems() {
  currentPage += 1;
  loadGallery(currentPage, 3, currentCategoryId);
}

function checkLoadedItemsCount(totalItems, loadedItemsCount) {
  // const totalItems = parseInt(portfolioGallery.dataset.totalItems, 10);
  // loadedItemsCount = portfolioGallery.children.length;
  console.log('Total items:', totalItems);
  console.log('Loaded items count:', loadedItemsCount);
  console.log('Current page:', currentPage);
  console.log('currentCategoryId:', currentCategoryId);
  if (loadedItemsCount >= totalItems) {
    hideLoadMoreBtn();
  } else {
    showLoadMoreBtn();
  }
}