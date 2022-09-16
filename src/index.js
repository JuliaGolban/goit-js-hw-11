import './sass/index.scss';
import getRefs from './js/components/getRefs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', () => {
  return alert('First, you need to choose how to view your search');
});
