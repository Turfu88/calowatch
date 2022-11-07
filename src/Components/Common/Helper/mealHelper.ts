import { v4 as uuidv4 } from 'uuid';

export type Ingredient = {
    id: string,
    productId?: string,
    name: string,
    quantity: number,
    kcal100g: number
}

export type Meal = {
    id?: string,
    name: string,
    ingredients: Ingredient[],
    kcal100g: number,
    totalKcal: number
}

export const mealHelper = {
    post: function(meal: Meal) {
        meal.id = uuidv4();
        console.log(meal);
        
        const allMeal = localStorage.getItem('meal');
        if (allMeal === null) {
            localStorage.setItem('meal', JSON.stringify([meal]));
            return;
        }
        localStorage.setItem('meal', JSON.stringify([...JSON.parse(allMeal), meal]));
    },
    getc: function(): Meal[] | null {
        const allMeal = localStorage.getItem('meal');
        if (allMeal === null) {
            return null;
        }

        return JSON.parse(allMeal);
    },
    get: function(id: string): Meal | null {
        const allMeal = localStorage.getItem('meal');
        if (allMeal === null) {
            return null;
        }
        const mealFound = JSON.parse(allMeal).find((meal: Meal) => meal.id === id);
        if (mealFound === undefined) {
            return null;
        }
        return mealFound;
    },
    update: function(updatedMeal: Meal) {
        const allMeal = localStorage.getItem('meal');
        if (allMeal === null) {
            return;
        }
        const updatedMeals = JSON.parse(allMeal).map((meal: Meal) => {
            if (meal.id === updatedMeal.id){
                return updatedMeal;
            }
            return meal;
        })
        localStorage.setItem('meal', updatedMeals.toString());
    },
    delete: function(id: string) {
        const allMeal = localStorage.getItem('meal');
        if (allMeal === null) {
            return;
        }
        const updatedMeals = JSON.parse(allMeal).filter((meal: Meal) => meal.id !== id)
        localStorage.setItem('meal', updatedMeals.toString());
    },
    updateTotalKcal: function(ingredients: Ingredient[]) {
        return ingredients.reduce((currentTotal, ingredient) => {
            return ingredient.kcal100g + currentTotal;
        }, 0);
    },
    updateKcal100g: function(ingredients: Ingredient[]) {
        const totalWeight = ingredients.reduce((currentTotal, ingredient) => {
            return ingredient.kcal100g + currentTotal;
        }, 0);
        const totalKcal = mealHelper.updateTotalKcal(ingredients);
        return Math.round(totalKcal * 100 / totalWeight);
    }
}