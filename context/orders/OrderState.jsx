import React, { useReducer } from "react";
import OderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";

import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  STOCK_PRODUCT,
  UPDATE_TOTAL,
} from "../../types";

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
  const addProduct = (productsSelected) => {
    let newState;
    if (state.products.length > 0) {
      //Tomar del segundo arreglo una copia para asignarlo al priemro
      newState = productsSelected.map((producto) => {
        const newObject = state.products.find(
          (productoState) => productoState.id === producto.id
        );
        return { ...producto, ...newObject };
      });
    } else {
      newState = productsSelected;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    });
  };

  //Modifica las catidades de los productos
  const numberProducts = (newProduct) => {
    dispatch({
      type: STOCK_PRODUCT,
      payload: newProduct,
    });
  };

  //Acutalizacion dinamica del costo
  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  return (
    <OderContext.Provider
      value={{
        client:state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProduct,
        numberProducts,
        updateTotal,
      }}
    >
      {children}
    </OderContext.Provider>
  );
};

export default OrderState;
