import axios from 'axios';

const API_KEY = '51688063-4461a08693fd836abbdb4b603';
const BASE_URL = 'https://pixabay.com/api/';

export const PER_PAGE = 15;

/**
 * Повертає data з відповіді API (без жодних DOM-маніпуляцій)
 * @param {string} query
 * @param {number} page
 * @returns {Promise<{hits: any[], totalHits: number}>}
 */
export async function getImagesByQuery(query, page) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });
  return data;
}
