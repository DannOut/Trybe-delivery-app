const ErrorClass = require('../utils/ErrorClass');

const validateSeller = (role, status) => {
    if (role === 'seller' && (status !== 'Preparando' && status !== 'Em Trânsito')) {
    throw new ErrorClass(401, 'unauthorized seller change');
  }
};

const validateChange = (role, status) => {
  if (role === 'customer' && status !== 'Entregue') {
    throw new ErrorClass(401, 'unauthorized customer change');
  }
  if (role === 'seller') {
    validateSeller(role, status);
  }
};

module.exports = validateChange;