export const dashedFrom = (str) => {
  if (!typeof str === "string") return null;
  if (!str) return null;
  return str
    .split(" ")
    .filter((item) => item)
    .join("-")
    .toLowerCase();
};

export const chatFrom = (str) => {};
