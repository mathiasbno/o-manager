import moment from "moment";

export const padArray = (arr, len, fill) => {
  return arr.concat(Array(len).fill(fill)).slice(0, len);
};

export const formatDate = (date, format = "Do of MMM") => {
  return moment(date).format(format)
}
