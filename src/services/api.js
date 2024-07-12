import axios from "axios";

const instance = axios.create({
  baseURL: 'https://6662c50d62966e20ef09edae.mockapi.io/api'
})

export default instance