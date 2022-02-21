import { toCapitalizedWords } from "./textTransform";

export const parseOptions = (options, optionsParsed) => {
  if (optionsParsed) {
    return options;
  }

  return (
    options?.map((option) => ({
      label: toCapitalizedWords(option),
      id: option,
    })) || []
  );
};
