import { getPortfolioItemsCategories, getPortfolioGallery } from './portfolio-api.js';
import { createCategoryButtons, createGallery, clearGallery, showLoadMoreBtn, hideLoadMoreBtn, showLoader, hideLoader } from './portfolio-render.js';

const portfolioGallery = document.querySelector('.portfolio-gallery');
const categoryButtonsContainer = document.querySelector('.portfolio-categories');

const categories = document.querySelector('.portfolio-categories');

let currentCategoryId = '';
let currentPage = 1;

const loadMoreButton = document.querySelector('.portfolio-load-more');

categoryButtonsContainer.addEventListener('click', handleCategoryClick);

initializePortfolio();
loadGallery(1, 9);

async function handleCategoryClick(event) {
  event.preventDefault();
  if (event.target.tagName === 'BUTTON') {
    const categoryId = event.target.dataset.id || '';
    currentCategoryId = categoryId;
    currentPage = 1;
    try {
      clearGallery();
      await loadGallery(currentPage, 9, currentCategoryId);
    } catch (error) {
      console.error("Error loading gallery:", error);
    }
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
    
  } catch (error) {
    console.error("Error loading gallery:", error);
  }
}


