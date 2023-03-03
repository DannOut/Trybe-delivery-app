const ErrorClass = require('../utils/ErrorClass');

const validateStatus = (req, _res, next) => {
  const { status } = req.body;
  const allStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];
  const checkStatus = allStatus.some((stat) => stat === status);
  if (!status) throw new ErrorClass(404, 'missing status field');
  if (!checkStatus) throw new ErrorClass(404, 'invalid status value');
  next();
};

module.exports = validateStatus;