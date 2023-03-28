import React, { useEffect } from "react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const BEST_CLIENTS = gql`
  query bestClients {
    bestClients {
      client {
        name
        lastName
        email
        business
      }
      total
    }
  }
`;

const BestClients = () => {
  //startPolling y stopPolling para actualizar en tiempo real
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(BEST_CLIENTS);

  //UseEffect
  useEffect(() => {
    startPolling(1000); //despues de un segundo vuelve a traer los datos o a consultar la bdd (se lo hace en caso de que haya un cambio, caso contrario no)
    //obtiene los resultados nuevos y luego se detiene
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  //Para que no marque undefined en data
  if (loading) return "Cargando..";

  const { bestClients } = data;

  //Extraer un objeto al primer objeto para aplanar el objeto, en este caso bestSellers
  const clientGraphic = [];

  bestClients.map((cliente, index) => {
    //index porque se coloca al vendedor dentro del indice en el que esta el objeto principal
    clientGraphic[index] = {
      ...cliente.client[0],
      total: cliente.total,
    };
  });

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>
        <ResponsiveContainer width={"99%"} height={550}>
          <BarChart
            className="mt-10 "
            width={600}
            height={500}
            data={clientGraphic}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </Layout>
    </>
  );
};

export default BestClients;
