import { MdArrowRight } from "react-icons/md";
import { useCartGlobalContext } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/helpers";
import React, { useState, useEffect } from "react";

const TotalAmounts = () => {
  const { totalAmount, changeShippingValue, shipping } = useCartGlobalContext();

  const [discount, setDiscount] = useState(0);
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] =
    useState(totalAmount);

  useEffect(() => {
    //endirim hesaplamamalri
    if (totalAmount) {
      let total = totalAmount;
      if (totalAmount > 50000) {
        total = totalAmount - (total * 20) / 100;
        setDiscount(20);
        setTotalPriceWithDiscount(total);
        if (totalAmount > 100000) {
          total = totalAmount - (total * 30) / 100;
          setDiscount(30);
          setTotalPriceWithDiscount(total);
        }
        if (totalAmount > 200000) {
          //  +SHIPPING FREEE
          total = totalAmount - (total * 35) / 100;
          setDiscount(35);
          setTotalPriceWithDiscount(total);
        }
      } else {
        setDiscount(0);
        setTotalPriceWithDiscount(total);
      }
    }
  }, [totalAmount]);
  return (
    <div className="total_amounts">
      <div className="promotion_code">
        <input type="text" placeholder="Promokod" />
        <div className="icon_box">
          <MdArrowRight className="icon" />
        </div>
      </div>
      <div className="desc">
        <li className="endirim">
          Endirim{" "}
          <span className={`${discount > 0 ? "discount" : ""}`}>
            {discount} %
          </span>
        </li>
        <li className="catdirilma">
          {" "}
          Catdirilma
          <input
            // className={`${
            //   discount > 34 ? "notShow shipping" : "show shipping"
            // }`}
            checked={Number(discount) > 34 ? true : false}
            type="checkBox"
            onClick={() => changeShippingValue()}
            disabled={Number(discount) > 34 ? true : false}
          />
          <span>{shipping ? 10 : 0} $</span>
        </li>
        <li className="total">
          {" "}
          Toplam{" "}
          <span>
            {formatPrice(
              shipping ? totalPriceWithDiscount + 1000 : totalPriceWithDiscount
            )}
          </span>
        </li>
      </div>

      <button className="btn">Sifarisi Resmilesdir</button>
    </div>
  );
};

export default TotalAmounts;
