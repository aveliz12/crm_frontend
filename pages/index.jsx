import Layout from "../components/Layout";
import Client from "../components/Client";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const GET_CLIENTS_BY_USER = gql`
  query GetClientsBySeller {
    getClientsSeller {
      id
      name
      lastName
      business
      email
      phone
    }
  }
`;

export default function Home() {
  const router = useRouter();

  //Consulta de apollo
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_USER);

  if (loading) {
    console.log("Cargando...");
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

        <Link href="/newClient" legacyBehavior>
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
            Nuevo Cliente
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Teléfono</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data === undefined
              ? data
              : data.getClientsSeller.map((client) => {
                  return <Client key={client.id} client={client} />;
                })}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
