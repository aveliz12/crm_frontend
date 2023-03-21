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

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const AddClientOrder = () => {
  const [client, setClient] = useState([]);

  //Context de pedidos
  const oderContext = useContext(OderContext);
  const { addClient } = oderContext;

  //Consultar la bdd
  const { data, loading, error } = useQuery(GET_CLIENTS_BY_USER);

  useEffect(() => {
    //TODO: Funsion para pasar clientes
    addClient(client);
  }, [client]);

  const seleccionarCliente = (options) => {
    setClient(options);
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
        className="mt-3"
        options={getClientsSeller}
        onChange={(opcion) => seleccionarCliente(opcion)}
        getOptionValue={(opcion) => opcion.id}
        getOptionLabel={(opcion) => `${opcion.name} ${opcion.lastName}`}
        placeholder="Busque o seleccione un cliente."
        noOptionsMessage={() => "No hay resultados."}
      />
    </Fragment>
  );
};

export default AddClientOrder;
