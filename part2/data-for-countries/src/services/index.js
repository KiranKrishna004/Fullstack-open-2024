import axios from "axios";
import { apiKey } from "../config";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getAll = () => {
  return axios.get(`${baseUrl}/all`);
};
const getByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`);
};

const getWeatherByLoc = (lat, long) => {
  return axios.get(`${weatherBaseUrl}?lat=${lat}&lon=${long}&appid=${apiKey}`);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteObj = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default {
  getAll: getAll,
  create: create,
  deleteObj: deleteObj,
  update: update,
  getByName: getByName,
  getWeatherByLoc: getWeatherByLoc,
};
