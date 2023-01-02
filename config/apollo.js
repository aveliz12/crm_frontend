import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

//Configuracion para tener la direccion a la cual nos vamos a conectar
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
  fetch,
});

//Permitir modificar los headers
const authLink = setContext((_, { headers }) => {

  //Leer storage almacenado
  const token=localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token?`Bearer ${token}`:''
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
