import axios from 'axios'
import store from 'store'
import base from '@/config/base.config'

const { BASE_URL,TOKEN_NAME,TIMEOUT } = base
let service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

//请求拦截
service.interceptors.request.use(async (config) => {
  let token = store.get(TOKEN_NAME)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

//响应拦截
service.interceptors.response.use((response) => {
  let result = response.data
  return result?.data
}, (error) => {
  return Promise.reject(error)
})

export default service