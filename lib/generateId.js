const generateCustomerId = () => {
  const prefix = "V";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  //   const zeroes = "0000";
  return `${prefix}${randomNum}`;
};

console.log(generateCustomerId());
