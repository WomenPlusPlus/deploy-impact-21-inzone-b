import axios from "axios";

const baseURL = "http://edunity.azurewebsites.net/";

export default axios.create({
    baseURL: baseURL
});
