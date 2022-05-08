const toNearestSnappingPoint = (value, snappingValue) =>
  Math.round(value / snappingValue) * snappingValue;

const colorDawn = '#A1A3A2';
const colorIron = '#D5D7D9';
const colorRodeoDust = '#CBB09A';
const colorPearlBrush = '#E8DCD2';
const colorBluish = '#307FB5';
const colorDuskBlue = '#225090';
const colorPastelRed = '#EA555A';
const colorMediumForestGreed = '#37722B';
const colorLightBlueGrey = '#B8C9DD';
const colorDarkPastelBlue = '#7DA0D4';

export {
  toNearestSnappingPoint,
  colorDawn,
  colorIron,
  colorRodeoDust,
  colorPearlBrush,
  colorBluish,
  colorDuskBlue,
  colorPastelRed,
  colorMediumForestGreed,
  colorLightBlueGrey,
  colorDarkPastelBlue,
};
