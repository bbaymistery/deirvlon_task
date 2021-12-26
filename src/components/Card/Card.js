import React from "react";
import { FiLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import "./card.scss";
const Card = ({ pr }) => {
  return (
    <Link to={`/products/${pr.id}`} className="card" key={pr.id}>
      <div className="card_icon">
        <FiLink />
      </div>
      <div className="card_image">
        <img src={pr.image} alt="img" />
      </div>
      <p className="card_desc">{pr.description.slice(0, 45) + "..."}</p>
      <p className="card_price"> {formatPrice(pr.price)}</p>
    </Link>
  );
};

export default Card;
