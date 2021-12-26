import React from "react";
import { Link } from "react-router-dom";
import { useCartGlobalContext } from "../../contexts/CartContext";
import EachItem from "./EachItem";
import TotalAmounts from "./TotalAmounts";
import ProductsCarousel from "../ProductsCarousel/ProductCarousel";
import Footer from "../Footer/Footer";
import "./cartItems.scss";
const CArtItems = () => {
  const { cartItems } = useCartGlobalContext();

  if (cartItems.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        Please Add something to your product List 🙂
        <Link
          to="/"
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "5px",
            display: "inline",
            width: "100px",
            margin: "10px auto",
            cursor: "pointer",
          }}
        >
          Products
        </Link>
      </p>
    );
  } else {
    return (
      <>
        <div className="cart_items container">
          {/* endirim tablosu  */}
          <marquee>
            <div className="discount-triceker">
              <p>
                <span className="first_discount">500$</span>
                Uzeri alisveris yapana toplam 20% endirim/
              </p>
              <p>
                <span className="second_discount">1000$</span>
                Uzeri alisveris yapana toplam 30% endirim/
              </p>
              <p>
                <span className="third_discount">2000$</span>
                Uzeri alisveris yapana toplam 30% endirim +
                <span className="catdirilma">Catdirilma</span>
              </p>
            </div>
          </marquee>
          <h2 className="title">Sebet</h2>
          <div className="cart_items_content">
            <div className="left">
              {cartItems?.map((cart, index) => {
                return <EachItem cart={cart} key={index} />;
              })}
            </div>
            <div className="right">
              <TotalAmounts />
            </div>
          </div>
          <ProductsCarousel />
        </div>
        <Footer />
      </>
    );
  }
};

export default CArtItems;
