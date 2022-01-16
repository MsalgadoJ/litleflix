import axios from 'axios';

const KEY = '6f26fd536dd6192ec8a57e94141f8b20';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/',
  params: {
    api_key: KEY
  }
})