import React, { useEffect, useState } from "react";
import { GridImage, getGridImages, scrambleGrid } from "../util";
import Tile from "./Tile";

const grid = {
  columns: 4,
  rows: 4,
};
const size = { width: 800, height: 800 };

const Grid = ({ image }: { image: string }) => {
  const [images, setImages] = useState<GridImage[]>([]);

  useEffect(() => {
    const getCanvas = async () => {
      const images = await getGridImages({
        imgSrc: image,
        grid,
        size,
      });
      const scrambledImages = scrambleGrid(images);
      console.log(scrambledImages.flat().map(({ position }) => position));
      setImages(scrambledImages.flat());
    };

    getCanvas();
  }, []);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
        gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
      }}
      className={`grid gap-[1px] w-fit`}
    >
      {images.map(({ imgSrc, position }) => {
        return (
          <Tile
            imgSrc={imgSrc}
            key={`${position.row}-${position.column}-${Math.random()}`}
          />
        );
      })}
    </div>
  );
};

export default Grid;
