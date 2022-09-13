import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import getRefs from './js/getRefs';
import ApiService from './js/api-service';
import LoadMoreBtn from './js/load-more';
import * as markup from './js/markup-cards';
import NotifyMessages from './js/notify-messages';
import Scroll from './js/scrollTo';

const refs = getRefs();
const apiServise = new ApiService();
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const notify = new NotifyMessages();
const loadMoreBtn = new LoadMoreBtn();
const scroll = new Scroll();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.scrollToTop.addEventListener('click', () => {
  scroll.scrollToTop();
});
document.addEventListener('scroll', () => {
  scroll.handleScrollToTop();
});

async function onSearch(e) {
  e.preventDefault();

  apiServise.query = e.currentTarget.elements.searchQuery.value;

  markup.clearMarkupPhotoCards();
  apiServise.resetPage();

  try {
    const data = await apiServise.fetchPhotoCards();

    if (data.total === 0 || !apiServise.query) {
      return notify.onFetchError();
    }

    renderSearchQuery(data);
    informMessage(data);
    loadMoreBtn.enable();
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  try {
    loadMoreBtn.disable();

    const data = await apiServise.fetchPhotoCards();

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
  loadMoreBtn.show();
}

function informMessage(data) {
  if (apiServise.currentPage === 1) {
    notify.onTotalPhotoCards(data.totalHits);
  }
  if (
    apiServise.currentPage >= Math.ceil(data.totalHits / apiServise.per_page)
  ) {
    loadMoreBtn.hide();
    notify.onFinishPhotoCards();
  }
}

// ==== infinite scroll ====

Confirm.show(
  'The method of viewing search',
  'Do you want to use infinite scrolling?',
  'Yes',
  'No',
  () => {
    loadMoreBtn.hide();
    function onEntry(entries) {
      entries.forEach(async entry => {
        if (entry.isIntersecting && apiServise.query) {
          const data = await apiServise.fetchPhotoCards();

          markup.createMarkupPhotoCards(data);
          lightbox.refresh();
          informMessage(data);
        }
      });
    }
    const options = {
      rootMargin: '300px',
    };
    const observer = new IntersectionObserver(onEntry, options);

    const sentinel = document.querySelector('#sentinel');
    observer.observe(sentinel);
  },
  () => {}
);
