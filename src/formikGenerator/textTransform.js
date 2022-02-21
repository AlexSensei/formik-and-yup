export function toCapitalizedWords(name) {
  const words = name.match(/[A-Za-z][^_\-A-Z]*/g) || [];

  return words.map(capitalize).join(" ");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export const parseNameToLabel = (name) => {
  const [_, splitedName] = name.split(".");

  if (splitedName) {
    return splitedName;
  }

  return name;
};
