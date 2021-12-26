import React from "react";
import "./accordion.scss";
const Accordion = ({ cart, isActive, setİsActive }) => {
  console.log(cart);
  return (
    <div className="accordion">
      <div className="accordion-item">
        <div
          className={`${
            !isActive ? "accordion-content animate" : "accordion-content"
          }`}
        >
          <p className="image">
            <img src={cart.image} alt="" />
          </p>
          <p className="memory">
            Memory : <span>{cart.memory}</span>
          </p>
          <p className="color_box">
            You Choiced :
            <button
              className="color"
              style={{ backgroundColor: `${cart.color}` }}
            ></button>
          </p>

          <p className="desc">{cart.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
