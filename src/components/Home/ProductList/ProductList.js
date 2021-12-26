import React, { useState } from "react";
import "./list.scss";
import { AiOutlineDown } from "react-icons/ai";
import PaginationOfProductList from "./PaginationOfProductList";
import { useFilterGlobalContext } from "../../../contexts/FilterContext";
import Card from "../../Card/Card.js";
const ProductList = () => {
  const { sortedProducts, loading, updateSortVaue } = useFilterGlobalContext();

  //pagination arrangements
  //sayfada gorunen productlarin useState i
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); //her sayfa dusen ad sayisi

  // sayfada kac tane calisan gostermek istiyorsak >productsPerPage
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const cuurentProducts = sortedProducts.slice(
    //bunu sortluyubasgda gonderdik
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPagesNum = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="product_list">
      <div className="product_list_header">
        <span>{sortedProducts.length} prdocut has found</span>

        <div className="select">
          <select
            name="sort"
            id="sort"
            className="sort-input"
            onChange={(e) => updateSortVaue(e.target.value)}
          >
            <option value="price-lowest">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a - z)</option>
            <option value="name-z">name (z - a)</option>
          </select>
          <AiOutlineDown className="icon" />
        </div>
      </div>

      <div className="card_list">
        {cuurentProducts.map((pr, index) => {
          return <Card pr={pr} key={pr.id} />;
        })}
      </div>

      <PaginationOfProductList
        sortedProducts={sortedProducts}
        totalPagesNum={totalPagesNum}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
/**

 */
