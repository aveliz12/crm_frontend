import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Order from "../components/Order";

const GET_ORDERS = gql`
  query getAllOrders {
    getOrderBySeller {
      id
      order {
        id
        cantidad
        name
      }
      client
      seller
      total
      status
    }
  }
`;

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);

  if (loading) return "Cargando...";

  const { getOrderBySeller } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
      <Link href="/newOrder" legacyBehavior>
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
          Nuevo Pedido
        </a>
      </Link>
      {getOrderBySeller.length === 0 ? (
        <p className="mt-5 text-center text-2xl">No hay pedidos aun.</p>
      ) : (
        getOrderBySeller.map((pedido) => {
          return <Order key={pedido.id} order={pedido} />;
        })
      )}
    </Layout>
  );
};
export default Orders;
