import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useCartGlobalContext } from "../../contexts/CartContext";
import { creditMonths } from "../../utils/constants";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import { formatPrice } from "../../utils/helpers";
const Modal = () => {
  const { singleProducts } = useProductsGlobalContext();
  const { isModalOpen, setModalToClose } = useCartGlobalContext();
  const [amountForModal, setAmountForModal] = useState(1);
  const [currentPriceToCalculate, setCurrentPriceToCalculate] = useState();
  const [defaultValueForMonth, setdefaultValueForMonth] = useState("6");

  useEffect(() => {
    if (singleProducts) {
      //destructing $ sign from current price
      let currentPriceWithDollar = formatPrice(singleProducts.price);
      let priceWithoutDollar = currentPriceWithDollar.slice(
        1,
        currentPriceWithDollar.length
      );
      setCurrentPriceToCalculate(Number(priceWithoutDollar));
    }
  }, [singleProducts]);

  const increaseAmount = () => {
    setAmountForModal(amountForModal + 1);
  };
  const decreaseAmount = (par) => {
    let a = amountForModal;
    if (a === 1) {
      a = 1;
    } else {
      a -= 1;
    }

    setAmountForModal(a);
  };
  if (!isModalOpen) {
    return null;
  } else {
    return (
      <div className="modal" onClick={(e) => setModalToClose(e)}>
        <div className="container">
          <div className="modal_box">
            <h2 className="modal_box_title">
              Hisse-hisse odenis
              <span
                style={{
                  fontSize: "10px",
                  marginLeft: "10rem",
                  backgroundColor: "black",
                  color: "yellow",
                  padding: "11px",
                  letterSpacing: "1px",
                }}
              >
                Okuyucuya Not: 6-12 ay ucun herhansi bir ilkin odenis
                olmadiginnan ilkin odenish kapatilmisdir Saygilar 🙏
              </span>
            </h2>
            <div className="cart_item">
              <div className="cart_item_image">
                <img
                  src={singleProducts?.images[0].thumbnails.large.url}
                  alt=""
                />
              </div>
              <div className="cart_item_name">
                <div className="subtitle">
                  <p style={{ fontWeight: "bold" }}>
                    Company{" "}
                    <span style={{ fontWeight: "normal", marginRight: "5px" }}>
                      {singleProducts.company}
                    </span>
                  </p>
                </div>
                <h3
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {singleProducts?.name}{" "}
                </h3>
              </div>
              <div className="cart_item_amount_box">
                <span className="decrease" onClick={() => decreaseAmount()}>
                  <HiMinusSm className="minus" />
                </span>
                <span className="amount">{amountForModal}</span>
                <span className="increase" onClick={() => increaseAmount()}>
                  <HiPlusSm className="plus" />
                </span>
              </div>

              <p className="cart_item_price">
                {`$ ${Math.round(amountForModal * currentPriceToCalculate)}`}
              </p>
            </div>

            <div className="credit_section">
              <div className="content">
                <div className="months">
                  {creditMonths.map((m, index) => {
                    return (
                      <span
                        key={index}
                        value={m.value}
                        onClick={() => setdefaultValueForMonth(m.value)}
                        className={
                          defaultValueForMonth === m.value ? "active" : "null"
                        }
                      >
                        {m.name}
                      </span>
                    );
                  })}
                </div>
                <div className="descriptionn">
                  <div className="long_period">
                    <p className="title">Muddet:</p>
                    <p className="desc">{defaultValueForMonth} ay</p>
                  </div>
                  <div
                    className="first_payment"
                    style={{
                      opacity: `${Number(defaultValueForMonth) < 14 ? 0 : 1}`,
                      transition: "0.4s ease-in",
                    }}
                  >
                    <p className="title">
                      Ilkin odenish:{" "}
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {/* //eger 15den buyuk ve 24den kucuk ise 20%
                        eger 24 ve 24den buyuk ise 25%  */}
                        {/* bunlARIN hepsini useEfeck ile yaza bilerdik ama bu bana daha kolay geldi */}
                        {(Number(defaultValueForMonth) >= 15 &&
                          Number(defaultValueForMonth) < 24 &&
                          `${20}%`) ||
                          (Number(defaultValueForMonth) >= 24 && `${25}%`)}
                      </span>
                    </p>
                    {/* eger 15 aydan fazla ise yuzde 20 odeuycek
                       eger 24 ay ve uzeri ise yuzde 25 ilkin odenis ioduycek
                    */}
                    <p className="desc">
                      {Number(defaultValueForMonth) >= 15 &&
                      Number(defaultValueForMonth) < 24
                        ? `${Math.ceil(
                            (amountForModal * currentPriceToCalculate * 20) /
                              100
                          )} $`
                        : `${0}$` || Number(defaultValueForMonth) >= 24
                        ? `${Math.ceil((currentPriceToCalculate * 25) / 100)} $`
                        : `${0}$`}
                    </p>
                  </div>
                  <div className="payment">
                    <div className="title">Aylig odenish:</div>
                    <p className="desc">
                      {" "}
                      {amountForModal *
                        Math.ceil(
                          currentPriceToCalculate / Number(defaultValueForMonth)
                        )}
                      $
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal_footer">
              <div className="footer_left">
                <p>
                  *Ilkin odenis meblegis umumi dovriyye ve odenis tarixcesinden
                  asili olarag deyise biler
                </p>
                <p>
                  **Mehsul nisye satilan zaman resmilesdilmesi ucun 5-12% xidmet
                  haggi elave oluna biler
                </p>
              </div>
              <div className="footer_right">
                <button className="btn">
                  Sifarisi resmilesdir
                  <span>
                    <MdKeyboardArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
