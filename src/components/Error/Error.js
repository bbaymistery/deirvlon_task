import React from "react";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import "./error.scss";
const Error = () => {
  const { singleProductsError } = useProductsGlobalContext();
  return (
    <div className="error">To many reguest Please try later Thank u . 🙂</div>
  );
};

export default Error;
