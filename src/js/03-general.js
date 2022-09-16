import '../sass/index.scss';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import getRefs from './components/getRefs';
import ApiService from './components/api-service';
import LoadMoreBtn from './components/load-more-btn';
import {
  createMarkupPhotoCards,
  clearMarkupPhotoCards,
} from './components/markup-cards';
import NotifyMessages from './components/notify-messages';
import Scroll from './components/scrollTo';

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

  loadMoreBtn.hide();
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
        notify.onTotalPhotoCards(data.totalHits);
        createMarkupPhotoCards(data);

        const onEntry = entries => {
          entries.forEach(async entry => {
            if (entry.isIntersecting && apiServise.query) {
              const data = await apiServise.fetchPhotoCards();
              createMarkupPhotoCards(data);

              if (
                data.totalHits <=
                apiServise.currentPage * apiServise.per_page
              ) {
                observer.unobserve(refs.sentinel);
                notify.onFinishPhotoCards();
              }
            }
          });
        };
        const options = {
          rootMargin: '100px',
        };
        const observer = new IntersectionObserver(onEntry, options);
        observer.observe(refs.sentinel);
      },
      () => {
        createMarkupPhotoCards(data);
        notify.onTotalPhotoCards(data.totalHits);

        if (data.totalHits <= apiServise.currentPage * apiServise.per_page) {
          return notify.onFinishPhotoCards();
        }

        loadMoreBtn.show();
        loadMoreBtn.enable();
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
    loadMoreBtn.enable();

    if (data.totalHits <= apiServise.currentPage * apiServise.per_page) {
      loadMoreBtn.hide();
      notify.onFinishPhotoCards();
    }
  } catch (error) {
    console.error(error);
  }
}
