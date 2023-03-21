import React, { useContext } from "react";
import OderContext from "../../context/orders/OrderContext";
import SummaryProduct from "./SummaryProduct";

const SummaryOrder = () => {
  //Context de pedidos
  const oderContext = useContext(OderContext);
  const { products } = oderContext;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Ajusta las cantidades del producto.
      </p>
      {products.length > 0 ? (
        <>
          {products.map((selected) => {
            <SummaryProduct key={selected.id} product={selected} />;
          })}
        </>
      ) : (
        <>
          <p className="mt-5 text-sm">Aun no hay productos.</p>
        </>
      )}
    </>
  );
};

export default SummaryOrder;
