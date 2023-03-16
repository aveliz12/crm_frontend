import React, { useReducer } from "react";
import OderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";

import { SELECT_CLIENT, SELECT_PRODUCT, STOCK_PRODUCT } from "../../types";

const OrderState = ({ children }) => {
  //State de Pedidos
  const inicialState = {
    client: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, inicialState);

  //Modifica el cliente
  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client, //Lo que se le va a pasar al state de reducer, sea para modificarlo o agregar algo nuevo
    });
  };

  //Modifica los productos
  const addProduct = (products) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: products,
    });
  };

  return (
    <OderContext.Provider
      value={{
        products: state.products,
        addClient,
        addProduct,
      }}
    >
      {children}
    </OderContext.Provider>
  );
};

export default OrderState;
