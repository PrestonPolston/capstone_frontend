const manageUserStorage = {
  saveToSessionStorage: (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  retrieveFromSessionStorage: (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  },
};
export default manageUserStorage;
