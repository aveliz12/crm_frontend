import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

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

const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      name
      email
    }
  }
`;

const EditClient = () => {
  //Obtener el ID actual pasado desde la URL
  const router = useRouter();
  const { query } = router;

  //CONSULTAR PARA OBTENER EL CLIENT
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id: query.pid,
    },
  });

  //ACTUALIZAR CLIENTE
  const [updateClient] = useMutation(UPDATE_CLIENT);

  //Schema de validación
  const schemaValidation = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastName: Yup.string().required("El apellido es obligatorio"),
    business: Yup.string().required("La empresa es obligatoria"),
    email: Yup.string()
      .email("Correo no válido")
      .required("El correo es obligatorio"),
  });

  if (loading) {
    console.log("Cargando...");
  }

  //Modificar el cliente en la bdd
  const updateInfoClient = async (valores) => {
    const { name, lastName, business, email, phone } = valores;
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            lastName,
            business,
            email,
            phone,
          },
        },
      });

      //TODO: sweet alert
      //Mostrar una alerta
      Swal.fire(
        "Actualizado!",
        "El cliente se actualizó correctamente",
        "success"
      );

      //TODO: REDIRECCIONAR
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Fragment>
      <Layout>
        <h1 className="text-2xl font-light">EDICION DE CLIENTE</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <Formik
              validationSchema={schemaValidation}
              enableReinitialize
              //initialValues={data}
              onSubmit={(values, functions) => {
                updateInfoClient(values);
              }}
            >
              {(props) => {
                console.log("PROPS CON VALUES",props.values.getClientsById.lastName)
                return (
                  <form
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={props.handleSubmit}
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        //value={props.values.getClientsById.name}
                      />
                    </div>

                    {/* {props.touched.name && props.errors.name ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.name}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        //value={props.values.getClientsById.lastName}
                      />
                    </div>

                    {/* {props.touched.lastName && props.errors.lastName ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.lastName}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        //value={props.values.getClientsById.business}
                      />
                    </div>

                    {/* {props.touched.business && props.errors.business ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.business}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        //value={props.values.getClientsById.email}
                      />
                    </div>

                    {/* {props.touched.email && props.errors.email ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{props.errors.email}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        //value={props.values.getClientsById.phone}
                      />
                    </div>

                    <input
                      type="submit"
                      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                      value="EDITAR CLIENTE"
                    />
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default EditClient;
