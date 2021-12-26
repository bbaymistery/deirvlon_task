import React, { useState } from "react";
import { useFilterGlobalContext } from "../../../contexts/FilterContext";
import "./filter.scss";
import { formatPrice, getUniqueValues } from "../../../utils/helpers";
import { useEffect } from "react";
const ProductFilter = () => {
  //destructing state valus fromfiltercontext
  const {
    allProducts,
    handleChange,
    filter: { price, maxPrice, minPrice },
  } = useFilterGlobalContext();
  //
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [companiesSelected, setCompaniesSelected] = useState("all");
  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");

  //bir onclick e ikidene funksya yazammadigimz ucun bunu tekli sekilde yazdk
  const handleClickLabel = (e) => {
    setCompaniesSelected(e.target.innerText.toLowerCase()), handleChange(e);
  };
  return (
    <div className="filter">
      <div className="filter_categories">
        <h2 className="title">Kateqoriyalar</h2>
        <hr />
        <ul>
          {categories.map((item) => {
            return (
              <li
                key={item}
                className={selectedCategory === item ? "active" : ""}
                onClick={() => setSelectedCategory(item)}
              >
                <a name="category" onClick={(e) => handleChange(e)}>
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="filter_price">
        <h2 className="filter_price_title">Qiymet Araligi</h2>
        <hr />
        <div className="filter_price_range">
          <div className="double_input">
            <input
              type="range"
              name="price"
              id="price"
              min={minPrice}
              max={maxPrice}
              onChange={(e) => handleChange(e)}
              defaultValue={maxPrice}
            />
            <label htmlFor="">{formatPrice(price)}</label>
          </div>
        </div>
      </div>
      <div className="filter_companies">
        <h2 className="filter_companies_title">Brendler</h2>
        <hr />

        {companies.map((comp) => {
          return (
            <div key={comp}>
              <input
                className="input_radio"
                type="radio"
                // id={comp}

                name="company"
                onClick={(e) => handleClickLabel(e)}
                value={comp}
                defaultChecked={companiesSelected === comp ? true : false}
              />
              <label htmlFor={comp} value={comp} name="company">
                {comp}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;
