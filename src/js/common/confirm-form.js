import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import getRefs from './getRefs';
import ApiService from './api-service';
import LoadMoreBtn from './load-more-btn';
import { createMarkupPhotoCards, clearMarkupPhotoCards } from './markup-cards';
import NotifyMessages from './notify-messages';

const refs = getRefs();
const apiServise = new ApiService();
const notify = new NotifyMessages();
const loadMoreBtn = new LoadMoreBtn();

export default Confirm.show(
  'The method of viewing search',
  'What method do you want to use?',
  'Infinite scroll',
  'Load more btn',
  () => {
    notify.onTotalPhotoCards(data.totalHits);
    createMarkupPhotoCards(data);
    const onEntry = entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting && apiServise.query) {
          const data = await apiServise.fetchPhotoCards();
          createMarkupPhotoCards(data);
          if (data.totalHits <= apiServise.currentPage * apiServise.per_page) {
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
