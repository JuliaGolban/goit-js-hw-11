export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('div.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    loadMoreLabel: document.querySelector('.label'),
    loadMoreSpinner: document.querySelector('.spinner'),
    scrollToTop: document.querySelector('.scroll-to-top'),
  };
}
