import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { gql, useQuery } from "@apollo/client";

//Querypara obtener cliente
const GET_CLIENT = gql`
  query GetClientsById($id: ID!) {
    getClientsById(id: $id) {
      name
      lastName
      business
      email
      phone
    }
  }
`;

const EditClient = () => {
  //Obtener el ID actual pasado desde la URL
  const router = useRouter();
  const {
    query,
  } = router;

  console.log(query.pid);

  //CONSULTAR PARA OBTENER EL CLIENT
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id:query.pid,
    },
  });

  if (loading) {
    console.log("Cargando...");
  }

  console.log(data)

  return (
    <Fragment>
      <Layout>
        <h1 className="text-2xl text-white font-light">EDICION DE CLIENTE</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              //onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="name"
                  type="text"
                  placeholder="Nombre Cliente"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.name}
                />
              </div>

              {/* {formik.touched.name && formik.errors.name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.name}</p>
                </div>
              ) : null} */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Apellido
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="lastName"
                  type="text"
                  placeholder="Apellido del Cliente"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.lastName}
                />
              </div>

              {/* {formik.touched.lastName && formik.errors.lastName ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.lastName}</p>
                </div>
              ) : null} */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="business"
                >
                  Empresa
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="business"
                  type="text"
                  placeholder="Negocio del Cliente"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.business}
                />
              </div>

              {/* {formik.touched.business && formik.errors.business ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.business}</p>
                </div>
              ) : null} */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="email"
                  type="email"
                  placeholder="Correo electrónico del Cliente"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.email}
                />
              </div>

              {/* {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null} */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Número de teléfono
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="phone"
                  type="tel"
                  placeholder="Número de teléfono del Cliente"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.phone}
                />
              </div>

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                value="EDITAR CLIENTE"
              />
            </form>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default EditClient;
