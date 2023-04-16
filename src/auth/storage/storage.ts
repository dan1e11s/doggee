export const startLocalStorage = (user: any) => {
  localStorage.setItem('email', user.email);
  localStorage.setItem('accessToken', user.accessToken);
};

export const startSessionStorage = (user: any) => {
  sessionStorage.setItem('email', user.email);
  sessionStorage.setItem('accessToken', user.accessToken);
};

export const getStorage = () => {
  return {
    email: localStorage.getItem('email'),
    accessToken: localStorage.getItem('accessToken'),
  };
};

export const endStorage = () => {
  localStorage.clear();
};
