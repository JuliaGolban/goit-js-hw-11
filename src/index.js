import './sass/index.scss';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import getRefs from './js/getRefs';
import ApiService from './js/api-service';
import LoadMoreBtn from './js/load-more';
import {
  createMarkupPhotoCards,
  clearMarkupPhotoCards,
} from './js/markup-cards';
import NotifyMessages from './js/notify-messages';
import Scroll from './js/scrollTo';
import onInfiniteScroll from './js/infinite-scroll';

const refs = getRefs();
const apiServise = new ApiService();
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

  clearMarkupPhotoCards();
  apiServise.resetPage();

  try {
    const data = await apiServise.fetchPhotoCards();

    if (data.total === 0 || !apiServise.query) {
      return notify.onFetchError();
    }

    Confirm.show(
      'The method of viewing search',
      'Do you want to use infinite scrolling?',
      'Yes',
      'No',
      () => {
        createMarkupPhotoCards(data);
        getMessage(data);
        onInfiniteScroll(data);
      },
      () => {
        createMarkupPhotoCards(data);
        loadMoreBtn.show();
        loadMoreBtn.enable();
        getMessage(data);
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  try {
    loadMoreBtn.disable();

    const data = await apiServise.fetchPhotoCards();

    createMarkupPhotoCards(data);
    getMessage(data);
    loadMoreBtn.enable();
  } catch (error) {
    console.error(error);
  }
}

function getMessage(data) {
  if (apiServise.currentPage === 1) {
    notify.onTotalPhotoCards(data.totalHits);
  }
  if (data.totalHits <= apiServise.currentPage * apiServise.per_page) {
    loadMoreBtn.hide();
    notify.onFinishPhotoCards();
  }
}
