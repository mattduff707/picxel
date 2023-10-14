import React, { useEffect, useState } from "react";
import "./App.css";
import { GridImage, getGridImages } from "./util";
import test from "./assets/test.jpg";

const grid = {
  columns: 5,
  rows: 5,
};

function App() {
  const [images, setImages] = useState<GridImage[]>([]);

  useEffect(() => {
    const getCanvas = async () => {
      const c = await getGridImages({
        imgSrc: test,
        grid,
        size: { width: 900, height: 900 },
      });

      // document.getElementById("root")?.appendChild(c);
      console.log(c);
      // setImage(c);
      setImages(c.flat());
    };

    getCanvas();
  }, []);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
        gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
      }}
      className={`grid gap-1 w-fit`}
    >
      {images.map(({ imgSrc }) => {
        return <img src={imgSrc} key={imgSrc} />;
      })}
    </div>
  );
}

export default App;
