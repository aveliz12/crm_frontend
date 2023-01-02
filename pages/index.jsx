import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";

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
  //Consulta de apollo
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_USER);

  if (loading) {
    console.log("Cargando...");
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Teléfono</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.getClientsSeller.map((client) => {
              return (
                <tr key={client.id}>
                  <td className="border px-4 py-2">
                    {client.name} {client.lastName}
                  </td>
                  <td className="border px-4 py-2">{client.email}</td>
                  <td className="border px-4 py-2">{client.business}</td>
                  <td className="border px-4 py-2">{client.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
