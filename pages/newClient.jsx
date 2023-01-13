import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastName
      business
      email
      phone
    }
  }
`;

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

const NewClient = () => {
  //Router
  const router = useRouter();

  //Mensaje de alerta
  let [mensaje, saveMsg] = useState(null);

  //Mutation para crear nuevos clientes
  const [newClient] = useMutation(NEW_CLIENT, {
    update: (cache, { data: { newClient } }) => {
      //Obtener el el objeto de cache que deseamos actualizar
      const { getClientsSeller } = cache.readQuery({
        query: GET_CLIENTS_BY_USER,
      });
      //Reescribir el cache (el cache nunca se debe modificar si no q reescribir)
      cache.writeQuery({
        query: GET_CLIENTS_BY_USER,
        data: {
          getClientsSeller: [...getClientsSeller, newClient],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      business: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      lastName: Yup.string().required("El apellido es obligatorio"),
      business: Yup.string().required("La empresa es obligatoria"),
      email: Yup.string()
        .email("Correo no válido")
        .required("El correo es obligatorio"),
    }),
    onSubmit: async (valores) => {
      const { name, lastName, business, email, phone } = valores;
      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastName,
              business,
              email,
              phone,
            },
          },
        });
        //Usuario creado correctamente
        saveMsg(`Se creó correctamente el cliente: ${data.newClient.name}`);
        setTimeout(() => {
          saveMsg(null);
          //redirigir usuario para iniciar sesion
          router.push("/");
        }, 4000);
      } catch (error) {
        saveMsg(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          saveMsg = null;
        }, 3000);
      }
    },
  });

  //Mostrar mensaje de error
  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

      {mensaje && showMessage()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>

            {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>

            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.lastName}</p>
              </div>
            ) : null}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business}
              />
            </div>

            {formik.touched.business && formik.errors.business ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.business}</p>
              </div>
            ) : null}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar Cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
