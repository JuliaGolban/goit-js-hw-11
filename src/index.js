import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
import getRefs from './js/getRefs';
import ApiService from './js/api-service';
import {
  createMarkupPhotoCards,
  clearMarkupPhotoCards,
} from './js/markup-cards';
import * as notify from './js/notify-messages';
import LoadMoreBtn from './js/load-more';
import scroll from './js/scroll-to-top';

const refs = getRefs();
const apiServise = new ApiService();
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const loadMoreBtn = new LoadMoreBtn();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchPhotoCards);

function onSearch(e) {
  e.preventDefault();

  apiServise.query = e.currentTarget.elements.searchQuery.value;

  if (!apiServise.query) {
    return;
  }

  clearMarkupPhotoCards();
  apiServise.resetPage();
  fetchPhotoCards();
  loadMoreBtn.show();
}

function fetchPhotoCards() {
  loadMoreBtn.disable();
  apiServise
    .fetchPhotoCards()
    .then(data => {
      renderSearchQuery(data);
      informMessage(data);
      loadMoreBtn.enable();
    })
    .catch(notify.onFetchError);
}

function renderSearchQuery(data) {
  createMarkupPhotoCards(data);
  lightbox.refresh();
}

function informMessage(data) {
  if (apiServise.currentPage === 1) {
    notify.onTotalPhotoCards(data);
  }
  if (
    apiServise.currentPage >= Math.ceil(data.totalHits / apiServise.per_page)
  ) {
    loadMoreBtn.hide();
    notify.onFinishPhotoCards();
  }
}
