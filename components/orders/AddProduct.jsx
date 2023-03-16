import React, { Fragment, useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import OderContext from "../../context/orders/OrderContext";

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      stock
      cost
    }
  }
`;

const AddProduct = () => {
  //state local del componente
  const [products, setProducts] = useState([]);

  //Context de pedidos
  const oderContext = useContext(OderContext);
  const { addProduct } = oderContext;

  //Consulta a la BDD
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    //TODO: funcion para pasar a pedidos state
    addProduct(products);
  }, [products]);

  const seleccionarProducto = (allProducts) => {
    setProducts(allProducts);
  };

  if (loading) return null;

  const { getProducts } = data;

  return (
    <Fragment>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Selección de productos.
      </p>
      <Select
        className="mt-3"
        options={getProducts}
        isMulti={true}
        onChange={(opcion) => seleccionarProducto(opcion)}
        getOptionValue={(opciones) => {
          opciones.id;
        }}
        getOptionLabel={(opciones) =>
          `${opciones.name} - ${opciones.stock} disponibles.`
        }
        placeholder="Busque o seleccione el producto"
        noOptionsMessage={() => "No hay resultados."}
      />
    </Fragment>
  );
};

export default AddProduct;
