import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

//copiar tal y como está en la consutal de graphql
const NEW_COUNT = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastName
      email
    }
  }
`;

const newAccount = () => {
  //State para le mensaje de si usuario ya esta registrado o no
  const [mensaje, guardarMensaje] = useState(null);

  //Mutation para crear nuevos usuarios
  const [newUser] = useMutation(NEW_COUNT);

  //Routing
  const router = useRouter();

  //Validacion de formularion
  const formik = useFormik({
    initialValues: {
      //valores iniciales que van en el campo de cada input
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es Obligatorio"), //obligatorio y required toma un mensaje de error
      lastName: Yup.string().required("El apellido es Obligatorio"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es Obligatorio"),
      password: Yup.string()
        .required("La contraseña es Obligatorio")
        .min(6, "La contraseña debe ser de al menos 6 dígitos"),
    }),
    onSubmit: async (values) => {
      //los values son los que se envian en el formulario
      //console.log(valores);
      const { name, lastName, email, password } = values;

      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              lastName,
              email,
              password,
            },
          },
        });
        console.log(data); //data es la respuesta de la funcion de graphql

        //Usuario creado correctamente
        saveMsg(`Se creó correctamente el Usuario: ${data.newUser.name}`);
        setTimeout(() => {
          saveMsg(null);
          //redirigir usuario para iniciar sesion
          router.push("/login");
        }, 4000);
      } catch (error) {
        saveMsg(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          saveMsg = null;
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        {mensaje && showMessage()}
        <h1 className="text-center text-2xl text-white font-light">
          CREAR NUEVA CUENTA
        </h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre:
                </label>
                <input
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Nombre de Usuario"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error:</p>
                  <p>{formik.errors.name}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Apellido:
                </label>
                <input
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Apellido del Usuario"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error:</p>
                  <p>{formik.errors.lastName}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error:</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password Usuario"
                  values={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error:</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                value="Crear cuenta"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default newAccount;
