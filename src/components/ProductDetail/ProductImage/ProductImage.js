import React, { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import "./image.scss";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
const ProductImage = ({
  images,
  singleProductsLoading,
  setfinalSingleProductDatas,
}) => {
  const [newImage, setNewImage] = useState(images[0].thumbnails.large.url);
  useEffect(() => {
    setfinalSingleProductDatas((prev) => {
      return { ...prev, image: newImage };
    });
  }, [newImage]);
  if (images.length === 0) {
    return <Loading />;
  }
  return (
    <div className="up">
      <div className="imageContainer">
        <div className="upImage">
          {!singleProductsLoading && (
            <img src={newImage && newImage} alt="img" />
          )}
        </div>
        <div className="downImages">
          <div className="left">
            <MdKeyboardArrowLeft />
          </div>
          {!singleProductsLoading &&
            images?.slice(0, 4).map((image, index) => {
              return (
                <div
                  className={`${
                    image.thumbnails.large.url === newImage
                      ? "active image"
                      : "image"
                  }`}
                  key={image.id}
                  onClick={() => setNewImage(image.thumbnails.large.url)}
                >
                  <img
                    src={image.thumbnails.large.url}
                    alt=""
                    key={`${image.id}`}
                  />
                </div>
              );
            })}
          <div className="right">
            <MdKeyboardArrowRight className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
