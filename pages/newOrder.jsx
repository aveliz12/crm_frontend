import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import AddClientOrder from "../components/orders/AddClient";
import AddProduct from "../components/orders/AddProduct";
import SummaryOrder from "../components/orders/SummaryOrder";
import Total from "../components/orders/Total";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;

const GET_ORDERS = gql`
  query getAllOrders {
    getOrderBySeller {
      id
      order {
        id
        cantidad
        name
      }
      client {
        id
        name
        lastName
        business
        email
        phone
      }
      seller
      total
      status
    }
  }
`;

//Context de pedidos
import OderContext from "../context/orders/OrderContext";

const newOrder = () => {
  //Router
  const router = useRouter();

  //State
  const [mensaje, setMensaje] = useState(null);

  //Utilizar context y extraer sus funciones y valores
  const oderContext = useContext(OderContext);
  const { client, products, total } = oderContext;

  //Mutation para crear un nuevo pedido
  const [newOrder] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      const { getOrderBySeller } = cache.readQuery({
        query: GET_ORDERS,
      });

      cache.writeQuery({
        query: GET_ORDERS,
        data: {
          getOrderBySeller: [...getOrderBySeller, newOrder],
        },
      });
    },
  });

  const validateOrder = () => {
    //array Metod llamado every: itera en todos los objetos del arreglo y todos deben cumplir la condicion revisada
    return !products.every((producto) => producto.cantidad > 0) ||
      total == 0 ||
      client.length == 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };
  const createNewOrder = async () => {
    //Data para el mutation
    const { id } = client;

    //Remover lo no deseado de productos
    const order = products.map(({ __typename, stock, ...product }) => {
      return product;
    });

    console.log(order);

    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: id,
            total,
            order,
          },
        },
      });

      //Redireccionar a pedidos
      router.push("/orders");

      //Mostrar alerta
      Swal.fire("Correcto", "El pedido se registró correctamente.", "success");
    } catch (error) {
      //console.log(error);
      setMensaje(error.message.replace("GraphQL error: ", ""));
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  //Mostrar mensajes
  const showMessage = () => {
    return (
      <div className="bg-red-200 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

      {mensaje && showMessage()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AddClientOrder />
          <AddProduct />
          <SummaryOrder />
          <Total />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
            onClick={() => createNewOrder()}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default newOrder;
