const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29751149-7f03b7bad417db024d5002aea';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  fetchPhotoCards() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.per_page,
    });
    return fetch(`${BASE_URL}?${searchParams}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  get currentPage() {
    let currentPage = this.page - 1;
    return currentPage;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
