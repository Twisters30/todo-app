export default function (message) {
  return new Promise((resolve) => {
    const confirmation = window.confirm(message);
    if (confirmation) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
