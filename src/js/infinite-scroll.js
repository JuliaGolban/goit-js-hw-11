import getRefs from './getRefs';
import ApiService from './api-service';
import * as markup from './markup-cards';

const refs = getRefs();
const apiServise = new ApiService();

export default function onInfiniteScroll(data) {
  const options = {
    rootMargin: '170px',
  };
  const observer = new IntersectionObserver(onEntry, options);
  observer.observe(refs.sentinel);

  function onEntry(entries) {
    entries.forEach(async entry => {
      if (entry.isIntersecting && apiServise.query) {
        const data = await apiServise.fetchPhotoCards();

        markup.createMarkupPhotoCards(data);

        if (apiServise.currentPage === 1) {
          notify.onTotalPhotoCards(data.totalHits);
        }
        if (data.totalHits <= apiServise.currentPage * apiServise.per_page) {
          notify.onFinishPhotoCards();
        }
      }
    });
  }
}
