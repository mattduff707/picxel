import React from "react";

const Tile = ({
  imgSrc,
  handleClick,
  isStaged,
}: {
  imgSrc: string;
  handleClick: () => void;
  isStaged: boolean;
}) => {
  return (
    <img
      src={imgSrc}
      style={{ outline: isStaged ? "2px solid red" : "none" }}
      onClick={handleClick}
    />
  );
};

export default Tile;
