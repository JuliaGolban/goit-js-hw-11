import getRefs from './getRefs';
const refs = getRefs();

export default class Scroll {
  constructor() {}
  scrollBy() {
    const { height: cardHeight } =
      refs.gallery.firstElementChild.getBoundingClientRect();

    return window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  scrollUp() {
    const start = refs.gallery.firstElementChild;
    return window.scrollTo({ top: start, behavior: 'smooth' });
  }

  show() {
    refs.scrollToTop.classList.remove('is-hidden');
  }

  hide() {
    refs.scrollToTop.classList.add('is-hidden');
  }

  handleScroll() {
    const GOLDEN_RATIO = 0.5;
    document.documentElement.scrollTop > GOLDEN_RATIO
      ? this.show()
      : this.hide();
  }
}
