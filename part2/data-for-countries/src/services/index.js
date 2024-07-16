import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  return axios.get(`${baseUrl}/all`);
};
const getByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`);
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
};
