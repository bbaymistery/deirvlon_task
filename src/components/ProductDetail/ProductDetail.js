import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.scss";

//comps
import Loading from "../Loading/Loading";
import Error from "../../components/Error/Error";
import ProductImage from "./ProductImage/ProductImage";
import ProductDescription from "./ProductDescription/ProductDescription";
import ProductInformation from "./ProductInformation/ProductInformation";
import ProductCarousel from "../ProductsCarousel/ProductCarousel";
import Footer from "../../components/Footer/Footer";

//contexts
import { useProductsGlobalContext } from "../../contexts/ProductContext";
import { useCartGlobalContext } from "../../contexts/CartContext";
const ProductDetail = () => {
  const {
    getSingleProduct,
    singleProducts,
    singleProductsLoading,
    singleProductsError,
  } = useProductsGlobalContext();
  const { addItemToCart } = useCartGlobalContext();
  const { id } = useParams();

  //we r gonna send this data to cartContext when ever we r gonna click to sebete ekle
  const [finalSingleProductDatas, setfinalSingleProductDatas] = useState({
    color: "",
    image: "",
    memory: "",
  });

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  //when loading is true
  if (singleProductsLoading) {
    return <Loading />;
  }
  //when error is true
  if (singleProductsError) {
    return <Error />;
  }
  //sebete ekle tikladigimizda secilen verilerin hepsini Carta ekliycez (image,solor,memory ..)
  const addItems = () => {
    //reducer ile destruct edeceyik//we r gonna delete by idColor from cart items
    let newItem = {
      amount: 1,
      ...finalSingleProductDatas,
      ...singleProducts,
      idColor: singleProducts.id + finalSingleProductDatas.color,
    };

    //arranging message to alert
    let AlertMessage = {
      className: "success",
      message: `${singleProducts.name} was added to cart`,
    };
    addItemToCart(newItem, AlertMessage);
  };
  if (singleProducts.length === 0) {
    return <p>Go to reload</p>;
  } else {
    const { images } = singleProducts;
    return (
      <div className="main_content">
        <div className="product_detail_show_case container">
          <ProductImage
            images={images}
            singleProductsLoading={singleProductsLoading}
            setfinalSingleProductDatas={setfinalSingleProductDatas}
          />
          <ProductDescription
            singleProduct={singleProducts}
            setfinalSingleProductDatas={setfinalSingleProductDatas}
            addItems={addItems}
          />
        </div>
        <ProductInformation />
        <ProductCarousel />
        <Footer />
      </div>
    );
  }
};

export default ProductDetail;
