export const sentenceCase = (word) => {
  let output = "",
    idx = 0,
    toBeArray = word.split("");

  for (idx; idx < toBeArray.length; idx++) {
    if (toBeArray[idx] === toBeArray[0]) {
      toBeArray[idx] = toBeArray[idx].toUpperCase();
    }
    output += toBeArray[idx];
  }
  return output;
};

// Indonesian Code Phone
export const ICP = (noHp) => {
  let output = "",
    idx = 0,
    toBeArray = Array.from(noHp);

  if (toBeArray[0] !== "0") {
    return "+62" + toBeArray.join("");
  }

  for (idx = 0; idx < toBeArray.length; idx++) {
    if (toBeArray[0] === "0") {
      toBeArray[idx] = "+62";
    }

    output += toBeArray[idx];
  }

  return output;
};
