import axios from "axios";

const baseURL = "https://inzone-backend.fly.dev/";

export default axios.create({
  baseURL,
});
