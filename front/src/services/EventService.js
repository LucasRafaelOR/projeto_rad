import axios from "axios";
import { currentUser } from "./AuthService";

var defaultAxios = null;

export const setToken = (token) => {
  defaultAxios = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAllEvents = async () => {
  if (defaultAxios == null) setToken(currentUser.token);

  const url = "eventos/";
  const response = await defaultAxios.get(url);
  return response.data;
};

export const createEvent = (event) => {
  if (defaultAxios == null) setToken(currentUser.token);

  const url = "eventos/";
  return defaultAxios.post(url, event);
};

export const updateEvent = async (id, newEvent) => {
  if (defaultAxios == null) setToken(currentUser.token);

  const url = `eventos/${id}`;
  await defaultAxios.put(url, newEvent);
};

export const deleteEvent = async (id) => {
  if (defaultAxios == null) setToken(currentUser.token);

  const url = `eventos/${id}`;
  await defaultAxios.delete(url);
};
