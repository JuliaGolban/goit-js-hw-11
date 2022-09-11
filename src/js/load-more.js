import getRefs from './getRefs';
const refs = getRefs();

export default class LoadMoreBtn {
  constructor() {}

  enable() {
    refs.loadMoreBtn.disabled = false;
    refs.loadMoreLabel.textContent = 'Load more';
    refs.loadMoreSpinner.classList.add('is-hidden');
  }

  disable() {
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreLabel.textContent = 'Loading...';
    refs.loadMoreSpinner.classList.remove('is-hidden');
  }

  show() {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }

  hide() {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}
