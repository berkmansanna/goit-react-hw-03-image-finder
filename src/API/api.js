import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;
const API_KEY = `27513369-b4299cf044d06764b30420eb5`;

export const fetchImgWithQuery = async (query, page = 1) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
