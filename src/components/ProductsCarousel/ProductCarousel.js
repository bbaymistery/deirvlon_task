import "./carousel.scss";
import React from "react";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import { useFilterGlobalContext } from "../../contexts/FilterContext";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import { useCartGlobalContext } from "../../contexts/CartContext";
const ProductCarousel = () => {
  //hem product contextden hemde filtercontext ala bilerik Ikiside musait
  const { allProducts, loading } = useFilterGlobalContext();
  const { singleProductsLoading, singleProductsError } =
    useProductsGlobalContext();

  if (singleProductsLoading) {
    return <Loading />;
  }
  if (singleProductsError) {
    return <p>To many reguest please try later 😊</p>;
  }
  return (
    <div className="container product_carousel">
      <h2 className="title">Oxsar mehsullar</h2>
      <div className="carousel_list">
        <div className="slider">
          <div className="slider_track">
            {allProducts?.map((pr) => (
              <div key={pr.id + 2} className="slide">
                <Card pr={pr} />
              </div>
            ))}

            {/* doubled */}
            {allProducts?.map((pr) => (
              <div key={pr.id + 1} className="slide">
                <Card pr={pr} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
/**
 *

 */
