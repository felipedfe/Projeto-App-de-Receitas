import { useEffect, useState } from 'react';

const useIngredients = (detail) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
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
    setIngredients(measurements);
  }, [detail]);
  return ingredients;
};

export default useIngredients;
