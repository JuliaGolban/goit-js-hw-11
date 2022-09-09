import getRefs from './getRefs';
const refs = getRefs();

function createMarkupPhotoCards(data) {
  const markup = data.hits
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
        return `<a class="gallery__card" href="${largeImageURL}">
    <div class="photo-card">
      <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width="240" height="170"/>
      <div class="photo-card__info">
        <p class="photo-card__info-item">
          <b>Likes</b><span class="photo-card__info-count">${likes.toLocaleString(
            'ru'
          )}</span>
        </p>
        <p class="photo-card__info-item">
          <b>Views</b><span class="photo-card__info-count">${views.toLocaleString(
            'ru'
          )}</span>
        </p>
        <p class="photo-card__info-item">
          <b>Comments</b><span class="photo-card__info-count">${comments.toLocaleString(
            'ru'
          )}</span>
        </p>
        <p class="photo-card__info-item">
          <b>Downloads</b><span class="photo-card__info-count">${downloads.toLocaleString(
            'ru'
          )}</span>
        </p>
      </div>
    </div>
  </a>`;
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
