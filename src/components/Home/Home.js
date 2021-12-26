import React from "react";
import "./Home.scss";
import Filter from "./Filter/Filter";
import ProductList from "./ProductList/ProductList";
import { useFilterGlobalContext } from "../../contexts/FilterContext";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";
const Home = () => {
  const { loading, error } = useFilterGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="home">
      <div className="container">
        <Filter />
        <ProductList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
