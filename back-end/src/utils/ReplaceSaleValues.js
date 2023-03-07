const changeToNumber = (sale, bool) => {
  if (bool) {
  const changeString = sale.totalPrice.replace(',', '.');
  const totalPrice = Number(changeString);
  const products = sale
  .products.map((product) => {
    const price = Number(product.price.replace(',', '.'));
    return { ...product, price, totalPrice };
  });
  return { ...sale, totalPrice, products };
  }
  const totalPriceResult = sale.totalPrice.toFixed(2).replace('.', ',');
  const products = sale.products
  .map(({ price, id, quantity }) => ({ price: price.toFixed(2).replace('.', ','), id, quantity }));
  return { ...sale, totalPrice: totalPriceResult, products };
};

module.exports = changeToNumber;