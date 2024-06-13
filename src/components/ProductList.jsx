import React from "react";
import { data } from "../data";

export const ProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {

  const onAddProduct = (product) => {
    const productExists = allProducts.find(item => item.id === product.id);
    if (productExists) {

      setTotal (total + product.price)
      setCountProducts(countProducts + product.quantity)
      setAllProducts(allProducts.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {

      setTotal (total + product.price  * product.quantity);
      setCountProducts(countProducts + product.quantity);
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
  };

  console.log(allProducts);

  return (
    <div className="container-items">
      {data.map((product) => (
        <div className="item" key={product.id}>
          <>
            <figure>
              <a href={product.urlImage}>
                <img src={product.urlImage} alt={product.nameProduct} />
              </a>
            </figure>
            <div className="info-product">
              <h2>{product.nameProduct}</h2>
              <p className="price">${product.price}</p>
              <button onClick={() => onAddProduct(product)}>
                Añade & Compra
              </button>
            </div>
          </>
        </div>
      ))}
    </div>
  );
};
