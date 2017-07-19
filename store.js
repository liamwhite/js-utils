export default {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    catch (err) {
      return false;
    }
  },

  get(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    }
    catch (err) {
      return value;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    }
    catch (err) {
      return false;
    }
  },
};
