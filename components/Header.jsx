import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      lastName
    }
  }
`;

const Header = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_USER);

  //Proteger que no se acceda a data antes de tener los datos
  if (loading) return null;

  //Si no hay informacion
  if (!data) {
    return router.push("/login");
  }

  const { name, lastName } = data.getUser;

  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="sm:flex sm:justify-between mb-5">
      <p className="mr-2 mb-5 lg:mb-0">
        Hola!! {name} {lastName}
      </p>
      <button
        onClick={() => signOut()}
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
