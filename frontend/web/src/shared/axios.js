import axios from "axios";

const baseURL = "https://azure-backend.azurewebsites.net/";

export default axios.create({
  baseURL,
});
