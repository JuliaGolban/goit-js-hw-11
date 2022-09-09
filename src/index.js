// === Libraries ===
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
// === API Service===
import { fetchPhotoCards } from './js/apiService';
// === ===
import getRefs from './js/getRefs';
import {
  createMarkupPhotoCards,
  clearMarkupPhotoCards,
} from './js/markupPhotoCards';
import scroll from './js/scrollByPage';

const refs = getRefs();
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.searchQuery.value.trim();

  //   debugger;
  clearMarkupPhotoCards();

  if (!searchQuery) {
    return;
  }

  fetchPhotoCards(searchQuery).then(createMarkupPhotoCards).catch(onFetchError);
}

function onFetchError(error) {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onFinishPhotoCards() {
  return Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function onTotalPhotoCards(totalHits) {
  return Notify.success('Hooray! We found ${totalHits} images.');
}
