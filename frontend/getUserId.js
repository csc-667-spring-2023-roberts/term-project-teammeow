module.exports = () => {
  const cookies = document.cookie.split(";");

  for (const item of cookies) {
    if (item.startsWith("userID=")) {
      return item.split("=")[1];
    }
  }
};
