import { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const { recipeDetail } = useContext(MyContext);
  useEffect(() => {
    const keys = Object.keys(recipeDetail);
    const ingredientsList = [];
    const measuresList = [];
    keys.forEach((key) => {
      if (key.includes('strIngredient') && recipeDetail[key]) {
        ingredientsList.push(recipeDetail[key]);
      }
      if (key.includes('strMeasure')) measuresList.push(recipeDetail[key]);
    });
    const measurements = [];
    ingredientsList.forEach((item, index) => {
      if (recipeDetail[item]) {
        measurements.push({ measure: measuresList[index], ingredient: item });
      }
    });

    setIngredients(measurements);
  }, [recipeDetail]);
  return ingredients;
};

export default useIngredients;
