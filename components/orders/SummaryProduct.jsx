import React from "react";

const SummaryProduct = ({ product }) => {
  const { name, cost } = product;

  return (
    <>
      <div className="md:flex md:justify-between md:items-center mt-5">
        <div className="md:w-2/4 mb-2 md:mb-0">
          <p className="text-sm">{name}</p>
          <p>$ {cost}</p>
        </div>
        <input
          type="number"
          placeholder="Cantidad"
          className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        />
      </div>
    </>
  );
};

export default SummaryProduct;
