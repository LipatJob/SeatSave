const toNearestSnappingPoint = (value, snappingValue) =>
  Math.round(value / snappingValue) * snappingValue;

const areColliding = (r1, r2) =>
  !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );

const colorDawn = '#A1A3A2';
const colorIron = '#D5D7D9';
const colorRodeoDust = '#CBB09A';
const colorPearlBrush = '#E8DCD2';
const colorBluish = '#307FB5';
const colorDuskBlue = '#225090';
const colorValentineRed = '#EA555A';
const colorPastelRed = '#EA555A';
const colorMediumForestGreed = '#37722B';
const colorLightBlueGrey = '#B8C9DD';
const colorDarkPastelBlue = '#7DA0D4';
const colorAlmond = '#E8DCD2';

const gridSize = 20;
const standardSize = 40;
const seatMapHeight = 400;
const maxPosY = 300;

export {
  toNearestSnappingPoint,
  areColliding,
  seatMapHeight,
  maxPosY,
  gridSize,
  standardSize,
  colorDawn,
  colorIron,
  colorRodeoDust,
  colorPearlBrush,
  colorBluish,
  colorDuskBlue,
  colorPastelRed,
  colorAlmond,
  colorMediumForestGreed,
  colorValentineRed,
  colorLightBlueGrey,
  colorDarkPastelBlue,
};
