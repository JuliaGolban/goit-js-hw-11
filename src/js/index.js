import '../sass/index.scss';
import getRefs from './common/getRefs';
import ApiService from './common/api-service';
import {
  createMarkupPhotoCards,
  clearMarkupPhotoCards,
} from './common/markup-cards';
import NotifyMessages from './common/notify-messages';
import Scroll from './common/scrollTo';
import './common/header-on-scroll';
import './common/popup';

const refs = getRefs();
const apiServise = new ApiService();
const notify = new NotifyMessages();
const scroll = new Scroll();

refs.searchForm.addEventListener('submit', onSearch);
refs.scrollToTop.addEventListener('click', () => {
  scroll.scrollToTop();
});
document.addEventListener('scroll', () => {
  scroll.handleScrollToTop();
});

async function onSearch(e) {
  e.preventDefault();
  refs.title.classList.add('visually-hidden');

  apiServise.query = e.currentTarget.elements.searchQuery.value;

  clearMarkupPhotoCards();
  apiServise.resetPage();

  try {
    const data = await apiServise.fetchPhotoCards();

    if (data.total === 0 || !apiServise.query) {
      return notify.onFetchError();
    }

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
  } catch (error) {
    console.error(error);
  }
}
