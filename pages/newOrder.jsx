import React, { useContext } from "react";
import Layout from "../components/Layout";
import AddClientOrder from "../components/orders/AddClient";
import AddProduct from "../components/orders/AddProduct";
import SummaryOrder from "../components/orders/SummaryOrder";
import Total from "../components/orders/Total";

//Context de pedidos
import OderContext from "../context/orders/OrderContext";

const newOrder = () => {
  //Utilizar context y extraer sus funciones y valores
  const oderContext = useContext(OderContext);
  const { client, products, total } = oderContext;

  const validateOrder = () => {
    //array Metod llamado every: itera en todos los objetos del arreglo y todos deben cumplir la condicion revisada
    return !products.every((producto) => producto.cantidad > 0) ||
      total == 0 ||
      client.length == 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AddClientOrder />
          <AddProduct />
          <SummaryOrder />
          <Total />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default newOrder;
