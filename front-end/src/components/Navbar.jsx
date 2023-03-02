import React from 'react';

export default function navbar() {
  return (
    <nav>
      <div data-testid="customer_products__element-navbar-link-products">
        link-products
      </div>
      <div data-testid="customer_products__element-navbar-link-orders">
        Link Orders
      </div>
      <div data-testid="customer_products__element-navbar-user-full-name">
        Link user-full-name
      </div>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        link-logout
      </button>
    </nav>
  );
}
