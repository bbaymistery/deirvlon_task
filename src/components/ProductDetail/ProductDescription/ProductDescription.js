import React, { useEffect, useState } from "react";
import "./desc.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { formatPrice } from "../../../utils/helpers";
import { useCartGlobalContext } from "../../../contexts/CartContext";
const ProductDescription = ({
  singleProduct,
  setfinalSingleProductDatas,
  addItems,
}) => {
  const { setModalToOpen } = useCartGlobalContext();

  //degerlerin birer birer alib setFinalSingla ordanda add to cart dedgiimzde direk cart items in icine atmis olaceyik
  const colors = singleProduct?.colors;
  const memories = ["32gb", "64gb", "128gb"];
  const [newColor, setNewColor] = useState(singleProduct?.colors[0]);
  const [newMemory, setNewMemory] = useState("64gb");

  //yuxardaki newMomory newcoloru bu use effectile setFinala atiyoruz
  useEffect(() => {
    setfinalSingleProductDatas((prev) => {
      return { ...prev, color: newColor, memory: newMemory };
    });
  }, [newColor, newMemory]);

  return (
    <div className="description">
      <div className="description_header">
        <p className="title">{singleProduct?.name}</p>
        <span className="subtitle">
          <span>Company:</span> {singleProduct?.company}
        </span>
        <p className="price">{formatPrice(singleProduct?.price)}</p>
      </div>
      <hr />
      <div className="description_body">
        <div className="body_left">
          <p className="body_left_title">Colors</p>
          <div className="body_left_color_box">
            {colors.map((c, index) => {
              return (
                <button
                  key={c}
                  className={c === newColor ? "color active" : "color"}
                  style={{ backgroundColor: `${c}` }}
                  onClick={() => setNewColor(c)}
                ></button>
              );
            })}
          </div>
        </div>
        <div className="body_right">
          {/* //yucari 20px asagi 20px  */}
          <p className="body_right_title">Memory</p>
          <div className="body_right_card_memories">
            {memories.map((m) => {
              return (
                <p
                  key={m}
                  className={m === newMemory ? "active" : "null"}
                  onClick={() => setNewMemory(m)}
                >
                  {m}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <hr />
      <div className="description_footer">
        <div className="left">
          <ul>
            <li>Ekran Olcusu:</li>
            <li>Emeliyat sistemi:</li>
            <li>Operative yaddas (Ram):</li>
            <li>Esas Kamera(MP):</li>
            <li>Akkumulyatorun hecmi (mAh):</li>
            <li>Daxili yaddas:</li>
          </ul>
        </div>
        <div className="right">
          <ul>
            <li>6.5</li>
            <li>IOS 3</li>
            <li>8GB</li>
            <li>64 + 12 + 12 + 15</li>
            <li>4500</li>
            <li>256 GB</li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="description_buttons">
        <button className="sebete_ekle btn" onClick={() => addItems()}>
          Sebekete Ekle
        </button>
        <button className="hisse_hisse btn" onClick={(e) => setModalToOpen(e)}>
          Hisse-hisse odenis
        </button>
        <button className="icon_btn">
          <AiOutlineHeart className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
