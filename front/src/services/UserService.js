import axios from "axios";
import { currentUser } from "./AuthService";

const apiURL = "http://localhost:3000";
var defaultAxios = null;

export const updateToken = (token) => {
  if (token)
    defaultAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};

export const logIn = async (user) => {
  const url = apiURL + "/login";

  console.log(axios.defaults);

  console.log(url);
  console.log(user);
  const resp = await axios.post(url, user);
  updateToken(resp.data.token);
  return resp;
};

export const findAllUsers = async () => {
  if (defaultAxios == null) updateToken(currentUser.token);

  const url = apiURL + "/users";
  const response = await defaultAxios.get(url);
  return response.data;
};

export const createUser = (user) => {
  const url = apiURL + "/register";
  return axios.post(url, user);
};

export const updateUser = async (id, newUser) => {
  if (defaultAxios == null) updateToken(currentUser.token);

  const url = apiURL + `/users/${id}/`;
  await defaultAxios.put(url, newUser);
};

export const deleteUser = async (id) => {
  if (defaultAxios == null) updateToken(currentUser.token);

  const url = `${apiURL}/users/${id}`;
  await defaultAxios.delete(url);
};
