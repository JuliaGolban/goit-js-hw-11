import { Notify } from 'notiflix/build/notiflix-notify-aio';

function onFetchError() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onFinishPhotoCards() {
  return Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function onTotalPhotoCards({ totalHits }) {
  return Notify.success(`Hooray! We found ${totalHits} images.`);
}

export { onFetchError, onFinishPhotoCards, onTotalPhotoCards };
