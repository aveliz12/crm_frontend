import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const GET_PRODUCTS = gql`
  query getProductsById($id: ID!) {
    getProductsById(id: $id) {
      id
      name
      stock
      cost
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProducts($id: ID!, $input: ProductInput) {
    updateProducts(id: $id, input: $input) {
      id
      name
      stock
      cost
    }
  }
`;

const UpdateProduct = () => {
  //Router
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  //CONSULTAR PARA OBTENER EL PRODUCTO
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      id: pid,
    },
  });

  //Definir el mutation para actualizar producto
  const [updateProducts] = useMutation(UPDATE_PRODUCT);

  //Schema de validacion
  const schemaValidation = Yup.object({
    name: Yup.string().required("El nombre del es requerido."),
    stock: Yup.number()
      .required("La cantidad de productos es requerido.")
      .positive("Solo valores mayor a 0")
      .integer("Deben ser valores enteros."),
    cost: Yup.number()
      .required("El precio es requerido.")
      .positive("El valor debe ser mayor a 0."),
  });

  if (loading) return "Cargando..";

  if (!data) {
    return "Acción no permitida.";
  }

  //Actualizar informacion del producto
  const updateInforProduct = async (valores) => {
    const { name, stock, cost } = valores;
    try {
      const { data } = await updateProducts({
        variables: {
          id: pid,
          input: {
            name,
            stock,
            cost,
          },
        },
      });

      console.log(data);

      //Redirigir hacia productos
      router.push("/products");

      //MOstrar una alerta
      Swal.fire(
        "Correcto",
        "El producto de actualizó correctamente.",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { getProductsById } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            enableReinitialize
            initialValues={getProductsById}
            validationSchema={schemaValidation}
            onSubmit={(valores) => {
              updateInforProduct(valores);
            }}
          >
            {(props) => {
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
                      placeholder="Nombre Producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                  </div>

                  {props.touched.name && props.errors.name ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="stock"
                    >
                      Cantidad disponible
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="stock"
                      type="number"
                      placeholder="Cantidad Diponible"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.stock}
                    />
                  </div>

                  {props.touched.stock && props.errors.stock ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.stock}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="cost"
                    >
                      Precio
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="cost"
                      type="number"
                      placeholder="Costo Producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.cost}
                    />
                  </div>

                  {props.touched.cost && props.errors.cost ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.cost}</p>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Actualizar Producto"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
