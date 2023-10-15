import React, { useEffect, useState } from "react";
import { GridImage, getGridImages, scrambleGrid } from "../util";
import Tile from "./Tile";

const grid = {
  columns: 4,
  rows: 4,
};
const size = { width: 800, height: 800 };

const checkIfUnscrambled = (
  correctImages: GridImage[],
  scrambledImages: GridImage[]
) => {
  return correctImages.every((correctImage, index) => {
    return (
      correctImage.position.row === scrambledImages[index].position.row &&
      correctImage.position.column === scrambledImages[index].position.column
    );
  });
};

const Grid = ({ image }: { image: string }) => {
  const [originalImages, setOriginalImages] = useState<GridImage[]>([]);
  const [scrambledImages, setScrambledImages] = useState<GridImage[]>([]);
  const [stagedIdx, setStagedIdx] = useState<number | null>(null);

  const isUnscrambled =
    scrambledImages.length > 0 &&
    checkIfUnscrambled(originalImages, scrambledImages);
  console.log(isUnscrambled);

  const handleClick = (idx: number) => {
    if (stagedIdx === null) {
      setStagedIdx(idx);
    }

    if (stagedIdx !== null) {
      const stagedImage = scrambledImages[stagedIdx];
      const clickedImage = scrambledImages[idx];

      const newScrambledImages = [...scrambledImages];
      newScrambledImages[idx] = stagedImage;
      newScrambledImages[stagedIdx] = clickedImage;

      setScrambledImages(newScrambledImages);
      setStagedIdx(null);
    }
  };

  useEffect(() => {
    const getCanvas = async () => {
      const images = await getGridImages({
        imgSrc: image,
        grid,
        size,
      });
      setScrambledImages(scrambleGrid(images));
      setOriginalImages(images);
    };

    getCanvas();
  }, []);

  return (
    <>
      <div
        style={{
          gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        }}
        className={`grid gap-[1px] w-fit`}
      >
        {scrambledImages.map(({ imgSrc, position }, idx) => {
          return (
            <Tile
              isStaged={stagedIdx === idx}
              handleClick={() => handleClick(idx)}
              imgSrc={imgSrc}
              key={`${position.row}-${position.column}-${Math.random()}`}
            />
          );
        })}
      </div>
      <h2>{isUnscrambled ? "true" : "false"}</h2>
    </>
  );
};

export default Grid;
