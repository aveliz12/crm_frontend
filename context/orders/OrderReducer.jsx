import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  STOCK_PRODUCT,
  UPDATE_TOTAL,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case STOCK_PRODUCT:
      return {
        ...state,
        products: state.products.map((producto) =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        ),
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        //funcion reduce._ metodo de js que entrega un acumulado al cual se pasan dos valores
        //el nuevo total que es el acumulado y el elemento del arreglo sobre el que se esta iterando, este caso producto
        total: state.products.reduce((newTotal, articulo) => {
          newTotal += articulo.cost * articulo.cantidad;
        }, 0),
      };

    default:
      return state;
  }
};
