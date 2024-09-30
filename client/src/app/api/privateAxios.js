import axios from 'axios'
import store from '../store'

const BASE_URL = 'http://localhost:5000/api'

const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

privateAxios.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

export default privateAxios
