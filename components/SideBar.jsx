import React from "react";
import Link from "next/link"; //reemplaza enlaces y permite navegar en diferentes paginas con mejor performance
import { useRouter } from "next/router";

const SideBar = () => {
  //Routing de Next
  const router = useRouter();
  console.log(router.pathname);

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-3"}>
          <Link href="/">
            <div className="text-white block">Clientes</div>
          </Link>
        </li>
        <li
          className={router.pathname === "/orders" ? "bg-blue-800 p-2" : "p-3"}
        >
          <Link href="/orders">
            <div className="text-white block">Pedidos</div>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/products" ? "bg-blue-800 p-2" : "p-2"
          }
        >
          <Link href="/products">
            <div className="text-white block">Productos</div>
          </Link>
        </li>
      </nav>

      {/*Menú para gráficas de mejores clientes y mejores vendedores*/}
      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black">Otras opciones</p>
      </div>
      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === "/bestSellers" ? "bg-blue-800 p-2" : "p-3"
          }
        >
          <Link href="/bestSellers">
            <div className="text-white block">Mejores Vendedores</div>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/bestClients" ? "bg-blue-800 p-2" : "p-3"
          }
        >
          <Link href="/bestClients">
            <div className="text-white block">Mejores Clientes</div>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default SideBar;
