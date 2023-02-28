const md5 = require('md5');

const decodePassword = (password) => {
  const decodedPassword = md5(password);
  return decodedPassword;
};

module.exports = decodePassword;
