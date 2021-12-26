import React from "react";
import "./SideBar.scss";
import {
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";

const Sidebarrr = () => {
  const { isSidebarOpen, closeSidebar } = useProductsGlobalContext();
  return (
    <div
      className={
        isSidebarOpen ? "sidebar_container active" : "sidebar_container"
      }
    >
      <div className="sidebar ">
        <div className="logo">
          <span className="left">Green</span>
          <span className="right">Tekno</span>
        </div>
        <div className="list_for_mobile">
          <ul>
            <li>
              <Link to="/" onClick={() => closeSidebar()}>
                Ana Sehife
              </Link>
            </li>
            <li>
              <Link to="/mehsullar" onClick={() => closeSidebar()}>
                Mehsullar
              </Link>
            </li>
            <li>
              <a href="">Endirimler</a>
            </li>
          </ul>
        </div>

        <div className="icons_for_mobile">
          <AiOutlineHeart className="heart" />
          <Link to="/mehsullar" onClick={() => closeSidebar()}>
            <AiOutlineShoppingCart className="shopping" />
          </Link>

          <span className="badge">1</span>
        </div>

        <div className="close_icon">
          <AiOutlineClose className="icon" onClick={() => closeSidebar()} />
        </div>
      </div>
    </div>
  );
};

export default Sidebarrr;
/*
      <div className="sidebar">
        <div className="logo">
          <span className="left">Green</span>
          <span className="right">Tekno</span>
        </div>
        <div className="list_for_mobile">
          <ul>
            <li>
              <a href="">Ana Sehife</a>
            </li>
            <li>
              <a href="">Mehsullar</a>
            </li>
            <li>
              <a href="">Endirimler</a>
            </li>
          </ul>
        </div>

        <div className="icons_for_mobile">
          <AiOutlineHeart className="heart" />
          <AiOutlineShoppingCart className="shopping" />
          <span className="badge">1</span>
        </div>

        <div className="close_icon">
          <AiOutlineClose className="icon" onClick={() => closeSidebar()} />
        </div>
      </div>
*/
