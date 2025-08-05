"use client";

import { useState, useEffect, useMemo } from 'react';

interface MealPlan {
  dishName: string;
  calories: number;
  instructions: string[];
  ingredients: string[];
}

const defaultData = {
  nutritionData: { name: "Generate a Meal Plan!", calories: 0, protein: 0, carbs: 0, fat: 0 },
  cookingStepsData: [{ title: "Your cooking steps will appear here.", description: "" }],
  // The default ingredientsData is now an empty array
  ingredientsData: [],
  imageUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088",
  hasPlan: false,
};

export const useRecipeLoader = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('mealPlan');
      if (savedPlan) {
        setMealPlan(JSON.parse(savedPlan));
      }
    } catch (error) {
      console.error("Failed to parse meal plan from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  const preparedData = useMemo(() => {
    if (!mealPlan) {
      return defaultData;
    }

    return {
      nutritionData: {
        name: mealPlan.dishName,
        calories: mealPlan.calories,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
      cookingStepsData: mealPlan.instructions.map((instruction, index) => ({
        title: `Step ${index + 1}`,
        description: instruction,
      })),
      // Generate placeholder prices with a value of 0 for each ingredient
      ingredientsData: mealPlan.ingredients.map(ingredient => ({
        name: ingredient,
        quantity: "1 unit",
        prices: [
            { store: "Lidl", price: 0 },
            { store: "Kaufland", price: 0 },
            { store: "Carrefour", price: 0 },
        ],
      })),
      imageUrl: defaultData.imageUrl,
      hasPlan: true,
    };
  }, [mealPlan]);

  if (isLoading) {
    return { ...defaultData, isLoading: true };
  }

  return { ...preparedData, isLoading: false };
};