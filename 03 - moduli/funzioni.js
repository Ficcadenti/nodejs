// console.log(__filename, __dirname);
const { PI } = Math;
const calcCircArea = (r) => {
  return r ** 2 * PI;
};

const calcRectArea = (l, h) => {
  return l * h;
};

module.exports = {
  PI,
  calcCircArea,
  calcRectArea,
};
