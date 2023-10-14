interface Grid {
  columns: number;
  rows: number;
}
interface Size {
  width: number;
  height: number;
}
export interface GridImage {
  imgSrc: string;
  position: { row: number; column: number; sx: number; sy: number };
}

const getGridArr = (
  grid: Grid,
  imgWidth: number,
  imgHeight: number
): GridImage[][] => {
  return Array(grid.rows)
    .fill(0)
    .map((_, row) =>
      Array(grid.columns)
        .fill(0)
        .map((_, column) => ({
          imgSrc: "",
          position: { row, column, sx: imgWidth * column, sy: imgHeight * row },
        }))
    );
};

export const getGridImages = async ({
  imgSrc,
  grid,
  size,
}: {
  imgSrc: string;
  grid: Grid;
  size?: Size;
}) => {
  const img = new Image();
  img.src = imgSrc;

  await img.decode();

  const extractionWidth = size
    ? size.width / grid.columns
    : img.width / grid.columns;
  const extractionHeight = size
    ? size.height / grid.rows
    : img.height / grid.rows;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = size ? size.width : img.width;
  canvas.height = size ? size.height : img.height;

  size
    ? ctx?.drawImage(img, 0, 0, size.width, size.height)
    : ctx?.drawImage(img, 0, 0);

  //   const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  // const imageDataTL = ctx?.getImageData(0, 0, 400, 400);
  // const imageDataTR = ctx?.getImageData(400, 0, 400, 400);
  // const imageDataBL = ctx?.getImageData(0, 400, 400, 400);
  // const imageDataBR = ctx?.getImageData(400, 400, 400, 400);

  // const images = [imageDataTL, imageDataTR, imageDataBL, imageDataBR].map(
  //   (imgData) => {
  //     const canvas2 = document.createElement("canvas");
  //     const ctx2 = canvas2.getContext("2d");
  //     canvas2.width = imgData?.width;
  //     canvas2.height = imgData?.height;

  //     ctx2?.putImageData(imgData!, 0, 0);

  //     return canvas2.toDataURL("image/png");
  //   }
  // );

  const gridArr = getGridArr(grid, extractionWidth, extractionHeight);
  const gridImages = gridArr.map((row) => {
    return row.map((gridImage) => {
      const { row, column, sx, sy } = gridImage.position;
      const imageData = ctx?.getImageData(
        sx,
        sy,
        extractionWidth,
        extractionHeight
      );

      const canvas2 = document.createElement("canvas");
      const ctx2 = canvas2.getContext("2d");
      canvas2.width = imageData?.width;
      canvas2.height = imageData?.height;

      ctx2?.putImageData(imageData!, 0, 0);

      return {
        imgSrc: canvas2.toDataURL("image/png"),
        position: { row, column, sx, sy },
      };
    });
  });

  // console.log(gridImages);

  return gridImages;

  //   console.log(imageData);

  //   const canvas2 = document.createElement("canvas");
  //   const ctx2 = canvas2.getContext("2d");
  //   canvas2.width = imageData?.width;
  //   canvas2.height = imageData?.height;

  //   ctx2?.putImageData(imageData!, 0, 0);

  //   return canvas;

  //   return canvas2.toDataURL("image/png");
};
