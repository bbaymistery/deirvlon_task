import React from "react";
import Gif from "../../assets/gif/loading-gear.gif";
import "./Loading.scss";
const Loading = () => {
  return (
    <div className="loading">
      <img src={Gif} alt="" />
    </div>
  );
};

export default Loading;
