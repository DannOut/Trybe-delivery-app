// import axios from 'axios';
import React /* { useEffect } */ from 'react';
import Navbar from '../components/Navbar';

export default function Products() {
  const [products, setProducts] = useState([]);
  const baseURLProducts = 'http://localhost:3001/products';

  useEffect(() => {
    const axiosProductsRequest = async () => {
      const result = await axios
        .get(baseURLProducts)
        .then((response) => response)
        .catch((response) => response);
      setProducts(result);
    };
    axiosProductsRequest();
    console.log('products :>> ', products);
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        futuramente aqui vai ser o card de cada produto
      </div>
    </div>
  );
}
