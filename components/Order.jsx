import React, { useState, useEffect } from "react";

const Order = ({ order }) => {
  //Datos de pedido
  const { id, total, client, status } = order;

  //State
  const [estadoPedido, setEstadoPedido] = useState(status);

  //Effect
  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
  }, [estadoPedido]);

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
      {/* Parte de la izquierda */}
      <div>
        <p className="font-bold text-gray-800">Cliente: {client}</p>
        <h2 className="text-gray-800 font-bold mt-10">Estado de pedido:</h2>
        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          defaultValue={estadoPedido}
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
        <button className="uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight">
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
