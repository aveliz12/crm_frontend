import React, { useContext, useState, useEffect } from "react";
import OderContext from "../../context/orders/OrderContext";

const SummaryProduct = ({ product }) => {
  //Context de pedidos
  const oderContext = useContext(OderContext);
  const { numberProducts, updateTotal } = oderContext;

  console.log(numberProducts);

  //STATE
  const [cantidad, setCantidad] = useState(0);

  //EFFECT
  useEffect(() => {
    updateCantidad();
    updateTotal();
  }, [cantidad]);

  const updateCantidad = () => {
    const newProduct = { ...product, cantidad: Number(cantidad) };
    numberProducts(newProduct);
  };

  const { name, cost } = product;

  return (
    <>
      <div className="md:flex md:justify-between md:items-center mt-5">
        <div className="md:w-2/4 mb-2 md:mb-0">
          <p className="text-sm">{name}</p>
          <p>$ {cost}</p>
        </div>
        <input
          type="number"
          placeholder="Cantidad"
          className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
          onChange={(e) => {
            setCantidad(e.target.value);
          }}
          value={cantidad}
        />
      </div>
    </>
  );
};

export default SummaryProduct;
