import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

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

const Product = ({ product }) => {
  const { id, name, cost, stock } = product;

  //Mutation para eliminar productos
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter(
            (productoActual) => productoActual.id !== id
          ),
        },
      });
    },
  });

  //ELIMINAR PRODUCTO
  const confirmDeleteProduct = () => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "No, cancelar.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //Eliminar producto de la bdd
          const { data } = await deleteProduct({
            variables: {
              id,
            },
          });

          //Confirmacion de mensaje
          Swal.fire("Correcto", data.deleteProduct, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  //EDITAR PRODUCTO
  const updateProduct = () => {
    //Router permite pasar parámetros
    Router.push({
      pathname: "/updateProduct/[id]",
      query: { id },
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">$ {cost}</td>
      <td className="border px-4 py-2">{stock} Unidades</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmDeleteProduct()}
        >
          ELIMINAR
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => updateProduct()}
        >
          EDITAR
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Product;
