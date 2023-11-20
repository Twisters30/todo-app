export default function () {
  const set = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const get = (key) => {
    const result = JSON.parse(localStorage.getItem(key));
    if (!result) {
      return [];
    } else {
      return result;
    }
  };
  return {
    set,
    get,
  };
}
