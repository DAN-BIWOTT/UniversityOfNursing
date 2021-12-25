export const isBrowser = () => typeof window !== "undefined";
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("uonClient")
    ? JSON.parse(window.localStorage.getItem("uonClient"))
    : {};

const setUser = (user) => {
  window.localStorage.setItem("uonClient", JSON.stringify(user));
};

export const handleLogin = (id, username, email, isAdmin) => {
  setUser({
    id: id,
    username: username,
    email: email,
  });
  if (isAdmin === 1) window.location.replace("/admin");
  else window.location.replace("/client");
  return true;
};
export const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
};
export const logout = (callback) => {
  setUser({});
  callback();
};
