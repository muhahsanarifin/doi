export const rupiah = (value) => {
  const options = {
    style: "currency",
    currency: "IDR",
  };
  return Intl.NumberFormat("id-ID", options).format(value);
};

export const dt = (dateAndTime) => {
  return dateAndTime.toFormat("DD '-' T")
}
