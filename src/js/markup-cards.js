import getRefs from './getRefs';
const refs = getRefs();

function createMarkupPhotoCards({ hits }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <a class="photo-card__link" href="${largeImageURL}">
        <img class="photo-card__img" src="${webformatURL}" alt="${tags}" 
            loading="lazy" width="240" height="170"/></a>
      <div class="photo-card__info">
        <p class="photo-card__info-item">
          <b>Likes</b><span class="photo-card__info-amount">${likes.toLocaleString(
            'ru'
          )}</span>
        </p>
        <p class="photo-card__info-item">
          <b>Views</b><span class="photo-card__info-amount">${views.toLocaleString(
            'ru'
          )}</span>
        </p>
        <p class="photo-card__info-item">
          <b>Comments</b><span class="photo-card__info-amount">${comments.toLocaleString(
            'ru'
          )}</span>
        </p>
        <p class="photo-card__info-item">
          <b>Downloads</b><span class="photo-card__info-amount">${downloads.toLocaleString(
            'ru'
          )}</span>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
  // refs.gallery.innerHTML = markup;
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkupPhotoCards() {
  refs.gallery.innerHTML = '';
}

export { createMarkupPhotoCards, clearMarkupPhotoCards };
