import React, { useState } from "react";
import { useEffect } from "react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import Image from "../../assets/hero-bcg.jpeg";
import { useCartGlobalContext } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/helpers";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Accordion from "./Accordion";

const EachItem = ({ cart }) => {
  const { decreaseAmountCartItem, increaseAmountCartItem } =
    useCartGlobalContext();
  const [isActive, setİsActive] = useState(false);
  return (
    <>
      <div className="cart_item">
        {/* for accordion */}
        <div className="detail_btn" onClick={() => setİsActive(!isActive)}>
          {!isActive ? (
            <AiOutlinePlusCircle className="icon_open icon" />
          ) : (
            <AiOutlineMinusCircle className="icon_close icon" />
          )}
        </div>
        <div className="cart_item_image">
          <img src={cart.image} alt="" />
        </div>
        <div className="cart_item_name">
          <div className="subtitle">
            <p style={{ fontWeight: "bold" }}>
              Company{" "}
              <span style={{ fontWeight: "normal", marginRight: "5px" }}>
                {cart.company}
              </span>
            </p>
          </div>
          <h3
            style={{
              textTransform: "capitalize",
            }}
          >
            {cart?.name}{" "}
          </h3>
        </div>
        <div className="cart_item_amount_box">
          <span className="decrease">
            <HiMinusSm
              className="minus"
              onClick={() => decreaseAmountCartItem(cart.idColor)}
            />
          </span>
          <span className="amount">{cart.amount}</span>
          <span
            className="increase"
            onClick={() => increaseAmountCartItem(cart.idColor)}
          >
            <HiPlusSm className="plus" />
          </span>
        </div>
        <p className="cart_item_price">
          {/* {`$ ${Math.round(amountForModal * currentPriceToCalculate)}`} */}
          {formatPrice(cart.price * cart.amount)}
        </p>
      </div>
      <Accordion cart={cart} isActive={isActive} setİsActive={setİsActive} />
      {/* <hr /> */}
    </>
  );
};

export default EachItem;
