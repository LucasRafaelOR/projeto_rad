import { setToken } from "./EventService";
import { logIn as serverLogIn, createUser, updateToken } from "./UserService";

const APP_KEY = "DEPS_FRONT_JWT";

export var currentUser = {
  user: {
    id: -1,
    email: "",
    name: "",
  },
  token: "",
};

const EMPTY_USER = {
  id: -1,
  email: "",
  name: "",
};

export const isLoggedIn = () => {
  if (currentUser?.token?.length > 0) return true;

  const str = localStorage.getItem(APP_KEY);
  let user = { id: -1 };
  try {
    user = JSON.parse(str) ? JSON.parse(str) : user;
    if (user?.token?.length > 0) {
      console.log(user?.id, currentUser?.id);
      currentUser = user;
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

const setCurrentUser = (data) => {
  console.log("setcurrentuser", data);
  let newUser = {
    token: data.token,
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    },
  };

  currentUser = newUser;
  localStorage.setItem(APP_KEY, JSON.stringify(currentUser));
};

export const logIn = async (user) => {
  const { data } = await serverLogIn(user);
  if (data) {
    setCurrentUser(data);
    setToken(data.token);
    return true;
  }
  return false;
};

export const logout = () => {
  currentUser = { user: { ...EMPTY_USER }, token: "" };
  localStorage.removeItem(APP_KEY);
};

export const register = async (user) => {
  let { data } = await createUser(user);
  if (!data) return false;

  return await logIn(user);
};
