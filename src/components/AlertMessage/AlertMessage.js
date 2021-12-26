import React, { useEffect } from "react";
import { useCartGlobalContext } from "../../contexts/CartContext";
import "./alert.scss";
const AlertMessage = () => {
  const { alert } = useCartGlobalContext();

  if (!alert.isAlert) {
    return null;
  } else {
    return (
      <div className={alert.className && `alert ${alert.className}`}>
        <p>{alert.message}</p>
      </div>
    );
  }
};

export default AlertMessage;
