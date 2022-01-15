import axios from "axios";

const baseURL = "http://0.0.0.0:5000/";

export default axios.create({
  baseURL,
});
