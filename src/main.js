// библиотеки
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// api-key 40999949-91c7d6cea5390f79fde95dcf3

const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.input');
const loaderContainer = document.querySelector('.loader-container');
const loader = document.querySelector('.loader');

const API_KEY = '40999949-91c7d6cea5390f79fde95dcf3';

function showLoader() {
  loaderContainer.style.display = 'block';
  loader.style.display = 'block';
}
function hideLoader() {
  loaderContainer.style.display = 'none';
  loader.style.display = 'none';
}

let requestParams = {
  key: '40999949-91c7d6cea5390f79fde95dcf3',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};


function searchImages(query) {
  requestParams.q = query;
  const searchParams = new URLSearchParams(requestParams);

  showLoader();

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      hideLoader();

      if (!response.ok) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      return response.json();
    })

    .then(({ hits }) => {
      const gallery = document.querySelector('.gallery');

      const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        close: true,
      });

      gallery.innerHTML = '';

      gallery.innerHTML = hits.reduce(
        (html, image) =>
          html +
          `<a class="gallery-link" href="${image.largeImageURL}">
            <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${image.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${image.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${image.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${image.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${image.downloads}</p>
              </li>
            </ul>
        </a>`,
        ''
      );

      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error.message,
        position: 'topRight',
      });
    });
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  searchImages(searchQuery);
});
