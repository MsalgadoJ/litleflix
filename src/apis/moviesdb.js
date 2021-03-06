import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/',
  params: {
    api_key: process.env.REACT_APP_MOVIEDB_API_KEY
  }
})