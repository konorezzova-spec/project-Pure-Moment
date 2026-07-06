import axios from "axios";

export async function getPortfolioItemsCategories() {
 
  const URL = "https://wedding-photographer.b.goit.study/api/categories";
  return (await axios.get(URL)).data;
};

export async function getPortfolioGallery(page = 1, limit = 3, categoryId='') {
  const serchParams = new URLSearchParams({
    page: page,
    limit: limit,
  });

  if (categoryId) {
    serchParams.append('categoryId', categoryId);
  }
  const URL = `https://wedding-photographer.b.goit.study/api/wedding-photos/`;
  
  return (await axios.get(URL, {params: serchParams})).data;
}