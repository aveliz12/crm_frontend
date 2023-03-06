import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      cost
    }
  }
`;

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      stock
      cost
    }
  }
`;

const NewProduct = () => {
  //Routing
  const router = useRouter();

  //Mutation de APOLLO
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      //Obtener objeto de cache
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });

      //Reescribir el objeto
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      });
    },
  });

  //Formulario apra nuevos productos
  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      cost: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre del es requerido."),
      stock: Yup.number()
        .required("La cantidad de productos es requerido.")
        .positive("Solo valores mayor a 0")
        .integer("Deben ser valores enteros."),
      cost: Yup.number()
        .required("El precio es requerido.")
        .positive("El valor debe ser mayor a 0."),
    }),
    onSubmit: async (valores) => {
      //Declarar variables que se agregan como nuevo producto
      const { name, stock, cost } = valores;

      try {
        const { data } = await newProduct({
          variables: {
            input: { name, stock, cost },
          },
        });

        //Mostrar una alerta de producto guardado
        Swal.fire("Creado", "Se creó el producto correctamente", "success");

        //Redireccionar a la pantalla productos
        router.push("/products");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
        Crear Nuevo Producto
      </h1>

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
                placeholder="Nombre Producto"
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
                htmlFor="stock"
              >
                Cantidad disponible
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="stock"
                type="number"
                placeholder="Cantidad Diponible"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              />
            </div>

            {formik.touched.stock && formik.errors.stock ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.stock}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cost}
              />
            </div>

            {formik.touched.cost && formik.errors.cost ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.cost}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Agregar Nuevo Producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
