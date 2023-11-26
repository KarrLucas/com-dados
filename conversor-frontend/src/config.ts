import axios from 'axios'

export const APP_NAME = 'Conversor de Imagem'
export const BASE_URL = process.env.REACT_APP_BASE_URL
export const HOST_API = 'http://localhost:2020/'

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 68,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 345,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

export const api = axios.create({
  baseURL: HOST_API,
}); 

export const defaultSettings: any = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'blue',
  themeLayout: 'horizontal',
  themeStretch: false,
};
