import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = 'e03263cb40f8f86bad9ac4d2fe50abfd';
const lang = 'es-MX'

const axiosGet = async (type, param, page = 1) => {
  let url 
  switch(type) {
    case 'search': 
      // console.log('search');
      url = `search/movie?&page=${page}&query=${param}&`;
      break;
    case 'top_rated': 
      // console.log('top_rated');
      url = `movie/top_rated?&page=${page}&`;
      break;
    case 'popular':
      // console.log('popular');
      url = `movie/popular?`;
      break;
    case 'movie':
      url = `movie/${param}?`
      break;
    case 'credits': 
      url = `movie/${param}/credits?`;
      break;
    case 'providers': 
      url = `movie/${param}/watch/providers?`;
      break;
    default:
      return { status: 500, data: {} };
  }

  const res = await axios({
    method: 'GET',
    url: url + `api_key=${apiKey}&language=${lang}`,
  })
  .then(response => response)
  .catch(err => {
    console.error(err);
    return err.response;
  });
  return res;
}

export {
  axiosGet,
};