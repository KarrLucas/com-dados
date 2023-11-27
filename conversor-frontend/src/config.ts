import axios from 'axios'

export const APP_NAME = 'Conversor de Imagem'
export const HOST_API = 'http://10.34.57.195:2020/'

export const api = axios.create({
  baseURL: HOST_API,
}); 