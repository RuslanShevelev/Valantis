 const format = (date) => date < 10 ? `0${date}` : date.toString();

 export const getTimeStamp = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}${format(month)}${format(day)}`;
};

