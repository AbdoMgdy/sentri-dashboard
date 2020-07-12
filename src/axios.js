// axios
import axios from "axios";

const domain =
  "https://cors-anywhere.herokuapp.com/https://rest-bot-dev.herokuapp.com/";

export default axios.create({
  baseURL: domain,
  headers: {
    // You can add your headers here
    mode: "cors"
  }
});
