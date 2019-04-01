const baseURL = "http://www.thecocktaildb.com/api/json/v1/1";

export async function getCocktails() {
  const url = `${baseURL}/filter.php?g=Cocktail_glass`;
  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const cocktails = jsonResponse.drinks;
    return cocktails;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getCocktailDetails(id) {
  const url = `${baseURL}/lookup.php?i=${id}`;
  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const cocktail = jsonResponse.drinks[0];
    return normalizeCocktail(cocktail);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function normalizeCocktail(cocktail) {
  const measureIngredientTuples = Object.entries(cocktail).reduce(
    (tuples, [key, value]) => {
      const { ingredientIndex, newTuple } = getNewTupleAndIngredientIndex(
        key,
        value,
        tuples
      );

      if (!newTuple) return tuples;

      return [
        ...tuples.slice(0, ingredientIndex),
        newTuple,
        ...tuples.slice(ingredientIndex + 1)
      ];
    },
    []
  );

  const { idDrink, strDrink, strDrinkThumb, strInstructions } = cocktail;
  return {
    idDrink,
    strDrink,
    strDrinkThumb,
    strInstructions,
    ingredients: measureIngredientTuples
  };
}

function getNewTupleAndIngredientIndex(key, value, tuples) {
  const measureRegExp = /^strMeasure[1-9]\d*$/;
  const ingredientRegExp = /^strIngredient[1-9]\d*$/;
  const numberRegexp = /\d+$/;

  if (measureRegExp.test(key) && value && value.replace(/\s/g, "").length) {
    const ingredientIndex = key.match(numberRegexp)[0] - 1;
    return {
      ingredientIndex,
      newTuple: [value, tuples[ingredientIndex] && tuples[ingredientIndex][1]]
    };
  }

  if (ingredientRegExp.test(key) && value) {
    const ingredientIndex = key.match(numberRegexp)[0] - 1;
    return {
      ingredientIndex,
      newTuple: [tuples[ingredientIndex] && tuples[ingredientIndex][0], value]
    };
  }

  return { ingredientIndex: null, newTuple: null };
}
