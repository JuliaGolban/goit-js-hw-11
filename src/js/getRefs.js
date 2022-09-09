export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('div.gallery'),
    loadMoreBtn: document.querySelector('button.load-more'),
  };
}
