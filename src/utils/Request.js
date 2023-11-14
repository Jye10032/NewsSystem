import axios from 'axios'
import { store } from '../redux/store'

axios.defaults.baseURL = 'http://localhost:5000'

axios.interceptors.request.use(
  function (config) {
    store.dispatch({ type: 'change_loading' })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function (config) {
    store.dispatch({ type: 'change_loading' })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
