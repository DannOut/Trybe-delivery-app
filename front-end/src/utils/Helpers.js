const redirectBasedInRole = (role) => {
  if (role === 'customer') {
    window.location.pathname = '/customer/products';
    return;
  }
  if (role === 'seller') {
    window.location.pathname = '/seller/orders';
    return;
  }
  if (role === 'administrator') {
    window.location.pathname = '/admin/manage';
  }
};

const teste = 0;

export { redirectBasedInRole, teste };
