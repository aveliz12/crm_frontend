import React, { useState, useEffect, Fragment, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import OderContext from "../../context/orders/OrderContext";

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

const AddClientOrder = () => {
  const [client, setClient] = useState([]);

  //Context de pedidos
  const oderContext = useContext(OderContext);
  const { addClient } = oderContext;

  //Consultar la bdd
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_USER);

  useEffect(() => {
    addClient (client);
  }, [client]);

  const seleccionarCliente = (allClients) => {
    setClient(allClients);
  };

  //Resultados de la consulta
  if (loading) return null;

  const { getClientsSeller } = data;

  return (
    <Fragment>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asignar un cliente al pedido.
      </p>
      <Select
        instanceId="long-value-select"
        className="mt-3"
        options={getClientsSeller}
        //isMulti={true}
        onChange={(opcion) => seleccionarCliente(opcion)}
        getOptionValue={(opciones) => {
          opciones.id;
        }}
        getOptionLabel={(opciones) => opciones.name}
        placeholder="Busque o seleccione el cliente"
        noOptionsMessage={() => "No hay resultados."}
      />
    </Fragment>
  );
};

export default AddClientOrder;
