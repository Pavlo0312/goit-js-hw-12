import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

// DOM
const form = document.querySelector('.form');
const input = document.querySelector('.user-input');
const loadMoreBtn = document.querySelector('.load-more');

// Стан
let page = 1;
let query = '';
let totalHits = 0;

// Налаштування iziToast
const toastBase = {
  position: 'topRight',
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  closeOnClick: true,
  transitionIn: 'bounceInLeft',
};

// Сабміт форми
form.addEventListener('submit', async e => {
  e.preventDefault();

  query = input.value.trim();
  if (!query) {
    iziToast.show({ ...toastBase, message: 'Please enter the search query' });
    return;
  }

  // Початкові дії
  page = 1;
  totalHits = 0;
  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits || 0;

    if (!data.hits || data.hits.length === 0) {
      iziToast.show({
        ...toastBase,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    // Кнопка Load more (якщо ще є що завантажувати)
    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.show({
        ...toastBase,
        backgroundColor: '#4E75FF',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    iziToast.show({
      ...toastBase,
      message: `Sorry, an error happened. Try again. Error: ${err.message}`,
    });
  } finally {
    hideLoader();
    form.reset();
    input.focus();
  }
});

// Клік по Load more
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits || []);

    // Плавний скрол після підвантаження
    const firstCard = document.querySelector('.gallery li');
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    // Перевірка кінця колекції
    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.show({
        ...toastBase,
        backgroundColor: '#4E75FF',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.show({
      ...toastBase,
      message: `Sorry, an error happened. Try again. Error: ${err.message}`,
    });
  } finally {
    hideLoader();
  }
});
