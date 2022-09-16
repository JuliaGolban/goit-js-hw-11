import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class NotifyMessages {
  constructor() {}

  onFetchError() {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  onFinishPhotoCards() {
    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  onTotalPhotoCards(total) {
    return Notify.success(`Hooray! We found ${total} images.`);
  }
}

Notify.init({
  cssAnimationStyle: 'slide-out-elliptic-top-bck',
  info: {
    position: 'center-bottom',
  },
});
