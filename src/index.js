import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
import fetchPhotoCards from './js/api-service';
import getRefs from './js/getRefs';
import {
  createMarkupPhotoCards,
  clearMarkupPhotoCards,
} from './js/markup-cards';
import {
  onFetchError,
  onFinishPhotoCards,
  onTotalPhotoCards,
} from './js/notify-messages';
import scroll from './js/scroll-to-top';

const refs = getRefs();
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.searchQuery.value.trim();

  clearMarkupPhotoCards();
  if (!searchQuery) {
    return;
  }
  fetchPhotoCards(searchQuery).then(renderSearchQuery).catch(onFetchError);
}

function renderSearchQuery(data) {
  createMarkupPhotoCards(data);
  onTotalPhotoCards(data);
  lightbox.refresh();
}
