import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
import getRefs from './js/getRefs';
import ApiService from './js/api-service';
import * as markup from './js/markup-cards';
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

  markup.clearMarkupPhotoCards();
  apiServise.resetPage();
  fetchPhotoCards();
  loadMoreBtn.show();
}

async function fetchPhotoCards() {
  try {
    loadMoreBtn.disable();
    const data = await apiServise.fetchPhotoCards();

    if (data.total === 0 || !apiServise.query) {
      loadMoreBtn.hide();
      return notify.onFetchError();
    }

    renderSearchQuery(data);
    informMessage(data);
    loadMoreBtn.enable();
  } catch (error) {
    console.error(error);
  }
}

function renderSearchQuery(data) {
  markup.createMarkupPhotoCards(data);
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
