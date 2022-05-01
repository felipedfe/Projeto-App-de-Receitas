const listIngredients = (detail) => {
  const keys = Object.keys(detail);
  const ingredientsList = [];
  const measuresList = [];
  keys.forEach((key) => {
    if (key.includes('strIngredient') && detail[key]) ingredientsList.push(key);
    if (key.includes('strMeasure')) measuresList.push(detail[key]);
  });
  const measurements = [];
  ingredientsList.forEach((item, index) => {
    if (detail[item]) {
      measurements.push({
        measure: measuresList[index] || 'qb',
        ingredient: detail[item],
      });
    }
  });
  return measurements.map(({ measure, ingredient }) => `${measure}-${ingredient}`);
};

export default listIngredients;
