import axios from 'axios';

const baseURL = 'https://edunity.azurewebsites.net/';

export default axios.create({
  baseURL,
});
