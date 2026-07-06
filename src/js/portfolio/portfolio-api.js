import axios from "axios";

const BASE_URL = "https://wedding-photographer.b.goit.study/api";

export async function getPortfolioItemsCategories() {
 
  const response = await axios.get(`${BASE_URL}/categories`);
  
  return response.data;
};

export async function getPortfolioGallery(page = 1, limit = 3, categoryId='') {

  const params = {
    page,
    limit,
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }
  const response = await axios.get(`${BASE_URL}/wedding-photos`, { params });
  
  return response.data;
}