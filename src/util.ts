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

      const extractedCanvas = document.createElement("canvas");
      const extractedCtx = extractedCanvas.getContext("2d");
      extractedCanvas.width = imageData?.width;
      extractedCanvas.height = imageData?.height;

      extractedCtx?.putImageData(imageData!, 0, 0);

      return {
        imgSrc: extractedCanvas.toDataURL("image/png"),
        position: { row, column, sx, sy },
      };
    });
  });

  return gridImages.flat();
};

export const scrambleGrid = (unshuffled: GridImage[]) => {
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;

  // const gridCopy = grid.map((row) => [...row]);
  // const scrambledGrid = gridCopy.map((row) => {
  //   return row.map((gridImage) => {
  //     const randomRow = Math.floor(Math.random() * grid.length);
  //     const randomColumn = Math.floor(Math.random() * grid[0].length);
  //     const temp = gridCopy[randomRow][randomColumn];
  //     gridCopy[randomRow][randomColumn] = gridImage;
  //     return temp;
  //   });
  // });

  // scramble image grid by swapping images
  // const scrambledGrid = grid.map((row) => [...row]);

  // return scrambledGrid;
};
