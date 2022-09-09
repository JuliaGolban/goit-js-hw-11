import { Notify } from 'notiflix/build/notiflix-notify-aio';

function onFetchError(error) {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onFinishPhotoCards() {
  return Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function onTotalPhotoCards(data) {
  return Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

export { onFetchError, onFinishPhotoCards, onTotalPhotoCards };
