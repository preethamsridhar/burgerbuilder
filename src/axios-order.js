import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-5b1d7.firebaseio.com/',
})

export default instance;