import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      status
    }
  }
`;

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

const GET_ORDERS = gql`
  query getAllOrders {
    getOrderBySeller {
      id
    }
  }
`;

const Order = ({ order }) => {
  //Datos de pedido
  const {
    id,
    total,
    client: { name, lastName, phone, email },
    status,
  } = order;

  //Mutation para cambiar el estado de un pediddo
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrderBySeller } = cache.readQuery({
        query: GET_ORDERS,
      });

      //Rescribir el cache
      cache.writeQuery({
        query: GET_ORDERS,
        //la parte que queremos reescribir
        data: {
          getOrderBySeller: getOrderBySeller.filter(
            (pedido) =>
              //saca el pedido que fue eliminar de la lista de pedidos, el que no es igual al q esta en la lista
              pedido.id !== id
          ),
        },
      });
    },
  });

  //States
  const [estadoPedido, setEstadoPedido] = useState(status);
  const [clase, setClase] = useState("");

  //Effect
  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
    clasePedido();
  }, [estadoPedido]);

  //Funcion que modifica el color del pedido de acuerdo a su estado
  const clasePedido = () => {
    if (estadoPedido === "PENDIENTE") {
      setClase("border-yellow-500");
    } else if (estadoPedido === "COMPLETADO") {
      setClase("border-green-500");
    } else {
      setClase("border-red-800");
    }
  };

  //Cambiar estado pedido
  const changeStatusOrder = async (newStatus) => {
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            status: newStatus,
            client: order.client.id,
          },
        },
      });

      setEstadoPedido(data.updateOrder.status);
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar pedido
  const confirmDeleteOrder = () => {
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
          const data = await deleteOrder({
            variables: {
              id,
            },
          });

          //Mostrar una alerta
          Swal.fire("Eliminado!", data.deleteOrder, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div
      className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      {/* Parte de la izquierda */}
      <div>
        <p className="font-bold text-gray-800">
          Cliente: {name} {lastName}
        </p>

        {email && (
          <p className="flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            {email}
          </p>
        )}

        {phone && (
          <p className="flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>

            {phone}
          </p>
        )}

        <h2 className="text-gray-800 font-bold mt-10">Estado de pedido:</h2>

        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          value={estadoPedido}
          onChange={(e) => changeStatusOrder(e.target.value)}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>
      {/* Parte de la derecha */}
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
        {order.order.map((articulo) => (
          <div key={articulo.id} className="mt-4">
            <p className="text-sm text-gray-600">Producto: {articulo.name}</p>
            <p className="text-sm text-gray-600">
              Cantidad: {articulo.cantidad}
            </p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Total a pagar: <span className="font-light">$ {total}</span>
        </p>
        <button
          className="uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
          onClick={() => confirmDeleteOrder()}
        >
          Eliminar Pedido
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
      </div>
    </div>
  );
};

export default Order;
