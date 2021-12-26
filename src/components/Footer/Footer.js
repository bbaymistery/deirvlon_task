import React from "react";
import "./footer.scss";
import { FaInstagram } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div
          className="logo"
          onClick={
            () =>
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            // window.scrollTo(0,document.body.scrollHeight)
          }
        >
          <Link to="/" className="left">
            Green
          </Link>
          <Link to="/" className="right">
            Tekno
          </Link>
        </div>

        <div className="informations">
          <div className="icons_box">
            <p className="title">Bizi Izleyin:</p>
            <p className="icons">
              <span>
                <FaInstagram />
              </span>
              <span>
                <BsFacebook />
              </span>
            </p>
          </div>

          <div className="contact">
            <p className="title">Elage:</p>
            <p className="number">+994 55 123 45 67</p>
            <p className="mail ">info@mail.com</p>
          </div>

          <div className="adress">
            <p className="title">Unvan:</p>
            <p className="desc">Ataturk Prospekti</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
