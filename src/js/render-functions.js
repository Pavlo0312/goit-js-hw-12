import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Елементи інтерфейсу
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loaderEl = document.querySelector('.loader');

// Ініціалізуємо lightbox один раз
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

/**
 * Додає картки в галерею за одну операцію та робить refresh лайтбоксу
 * @param {Array} images
 */
export function createGallery(images) {
  if (!images || images.length === 0) return;

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${largeImageURL}">
          <img class="gallery__img" src="${webformatURL}" alt="${tags}" />
          <div class="grid">
            <p>Likes</p><p>Views</p><p>Comments</p><p>Downloads</p>
            <span>${likes}</span><span>${views}</span><span>${comments}</span><span>${downloads}</span>
          </div>
        </a>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

/** Очищає галерею */
export function clearGallery() {
  galleryEl.innerHTML = '';
}

/** Показати лоадер */
export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

/** Сховати лоадер */
export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

/** Показати кнопку Load more */
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

/** Сховати кнопку Load more */
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
