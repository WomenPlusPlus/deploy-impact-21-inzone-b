import axios from 'axios';

const baseURL = 'https://edunity-backend.azurewebsites.net/';

export default axios.create({
  baseURL,
});
