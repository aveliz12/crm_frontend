import React from "react";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Product from "../components/Product";
import Link from "next/link";

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

const Products = () => {
  //Consultar productos
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return "Cargando..";

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Productos</h1>

      <Link href="/newProduct" legacyBehavior>
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
          Nuevo Producto
        </a>
      </Link>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Precio</th>
            <th className="w-1/5 py-2">Existencia</th>
            <th className="w-1/5 py-2">Eliminar</th>
            <th className="w-1/5 py-2">Editar</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {data === undefined
            ? data
            : data.getProducts.map((product) => {
                return <Product key={product.id} product={product} />;
              })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
