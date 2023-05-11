module.exports = () => {
  const path = location.pathname.split("/");
  return path[path.length - 1];
};
