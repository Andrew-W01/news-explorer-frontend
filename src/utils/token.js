const TOKEN_KEY = "jwt";
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = () => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeToken(TOKEN_KEY);
