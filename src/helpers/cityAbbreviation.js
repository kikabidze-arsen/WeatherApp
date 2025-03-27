export const replaceAbbreviation = (city) => {
  const lowerCaseCity = city.toLowerCase();

  if (cityAbbreviations[lowerCaseCity]) {
    return cityAbbreviations[lowerCaseCity];
  }

  return city;
};

const cityAbbreviations = {
  мск: "Москва",
  нск: "Новосибирск",
  спб: "Санкт-Петербург",
};
