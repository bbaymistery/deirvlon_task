import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useCartGlobalContext } from "../../contexts/CartContext";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import { headerLinks } from "../../utils/constants";
import "./Header.scss";
const Header = () => {
  const { iseSidebarOpen, openSidebar } = useProductsGlobalContext();
  const { totalItems } = useCartGlobalContext();
  const [activeLink, setActiveLink] = useState("Ana Sehife");
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <span className="left">Green</span>
          <span className="right">Tekno</span>
        </div>
        <div className="list">
          <ul>
            {headerLinks.map((link) => {
              return (
                <li
                  key={link.name}
                  className={link.name === activeLink ? "active" : ""}
                  onClick={() => setActiveLink(link.name)}
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="icons">
          <AiOutlineHeart className="heart" />
          <Link to="/mehsullar">
            <AiOutlineShoppingCart className="shopping" />
          </Link>
          <span className="badge">{totalItems}</span>
        </div>

        <div className="hamburger_menu">
          <GiHamburgerMenu
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={() => openSidebar()}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
