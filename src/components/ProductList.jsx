import React from "react";
import { data } from "../data";

export const ProductList = ({ allProducts, setAllProducts }) => {

    const onAddProduct = (product) => {
    setAllProducts([...allProducts, product]);
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
