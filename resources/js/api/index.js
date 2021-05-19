import axios from 'axios'

export const baseURL = 'http://marge-result.test:8000/api/admin/'

const http = axios.create({
  baseURL,
  withCredentials: false
})

http.interceptors.request.use((config) => {
  if (localStorage.access_token) {
    config.headers.Authorization = `Bearer ${localStorage.access_token}`
  }
  return config
}, (error) => {
  console.error(error.status)
  return Promise.reject(error)
})

export {
  http
}
