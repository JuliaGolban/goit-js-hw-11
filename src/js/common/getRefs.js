export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    title: document.querySelector('h1.title'),
    navToggler: document.querySelector('a.nav-toggler__link'),
    cog: document.querySelector('.cog'),
    gallery: document.querySelector('div.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    loadMoreLabel: document.querySelector('.label'),
    loadMoreSpinner: document.querySelector('.spinner'),
    scrollToTop: document.querySelector('.scroll-to-top'),
    sentinel: document.querySelector('#sentinel'),
  };
}
