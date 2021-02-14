import axios from "axios";

const API = "https://unipiso-backend.herokuapp.com";
const testAPI = "http://localhost:3000";

export default axios.create({
  baseURL: testAPI,
});
