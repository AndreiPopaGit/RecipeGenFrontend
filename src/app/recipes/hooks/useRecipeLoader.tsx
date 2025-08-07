"use client";

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

interface MealPlan {
  dishName: string;
  calories: number;
  instructions: string[];
  ingredients: string[];
}

const defaultData = {
  nutritionData: { name: "Generate a Meal Plan!", calories: 0, protein: 0, carbs: 0, fat: 0 },
  cookingStepsData: [{ title: "Your cooking steps will appear here.", description: "" }],
  ingredientsData: [],
  imageUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088",
  hasPlan: false,
};

export const useRecipeLoader = () => {
  const searchParams = useSearchParams();
  const mealPlanDataString = searchParams.get('data');

  const mealPlan: MealPlan | null = useMemo(() => {
    if (!mealPlanDataString) return null;
    try {
      return JSON.parse(decodeURIComponent(mealPlanDataString));
    } catch (error) {
      console.error("Failed to parse meal plan from URL", error);
      return null;
    }
  }, [mealPlanDataString]);

  const preparedData = useMemo(() => {
    if (!mealPlan) {
      return { ...defaultData, isLoading: false };
    }

    return {
      nutritionData: {
        name: mealPlan.dishName,
        calories: mealPlan.calories,
        protein: 0, // Assuming these will be populated if available
        carbs: 0,
        fat: 0,
      },
      cookingStepsData: mealPlan.instructions.map((instruction, index) => ({
        title: `Step ${index + 1}`,
        description: instruction,
      })),
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
      isLoading: false,
    };
  }, [mealPlan]);

  // The loading state is now implicitly handled by whether `mealPlan` is available
  return preparedData;
};