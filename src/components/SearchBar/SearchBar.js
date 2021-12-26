import React from "react";
import "./SearchBar.scss";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useFilterGlobalContext } from "../../contexts/FilterContext";
const SearchBar = () => {
  const { handleChange } = useFilterGlobalContext();

  return (
    <div className="search_bar">
      <div className="container">
        <div className="select_category">
          <AiOutlineMenu className="select_category_icon" />
          {/* //16px */}
          <p className="select_category_text">Kategoriyalari goster</p>
        </div>

        <div className="search">
          {/* placeholder 21px
            icon 33px
            */}

          <input
            type="text"
            placeholder="Mehsul axtar"
            className="search_input"
            name="searchQuery"
            onChange={(e) => handleChange(e)}
          />
          <AiOutlineSearch className="search_icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
