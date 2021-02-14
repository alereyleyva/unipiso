import axios from "axios";

const API = "https://unipiso-backend.herokuapp.com";

export default axios.create({
  baseURL: API,
});
