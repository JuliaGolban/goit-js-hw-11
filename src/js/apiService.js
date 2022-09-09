const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29751149-7f03b7bad417db024d5002aea';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});

function fetchPhotoCards(q) {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${q}&${searchParams}`).then(
    res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    }
  );
}

export { fetchPhotoCards };

let page = 1;
let per_page = 40;
