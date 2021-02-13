import React from "react";

const ImageLightBox = ({ selectedImg, setSelectedImg }) => {
  const handelClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };
  return (
    <div className="backdrop" onClick={handelClick}>
      <img src={selectedImg} alt="lightbox" />
    </div>
  );
};
export default ImageLightBox;
