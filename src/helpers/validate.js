// Indonesian Number Phone Code with Zero
export const INPCwZero = (noTelp) => {
  const regex = /^0\d{9,11}$/;
  return regex.test(noTelp);
};
