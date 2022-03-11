export const capsFirstLetter = (string) => {
  const words = string.split(" ");

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  // return string?.charAt(0).toUpperCase() + string?.slice(1);
};
