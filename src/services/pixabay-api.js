const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '19265918-53e7e1b4cc966fb2ac418e7ff';
const IMAGES_PER_PAGE = 12;

function fetchImages(query, page) {
  return fetch(`${BASE_URL}&key=${API_KEY}&q=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}`)
    .then(response => {
      if (response.ok) return response.json();
      return Promise.reject(new Error(`По запросу "${query}" ничего не найдено!`));
    })
    .then(({ hits }) => hits);
}

export { fetchImages };
