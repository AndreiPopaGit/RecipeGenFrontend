"use client";

import { Suspense } from 'react';
import ImagePlaceholder from "./components/ImagePlaceholder";
import NutritionInfo from "./components/NutritionInfo";
import CookingSteps from "./components/CookingSteps";
import IngredientsPrices from "./components/IngredientsPrices";
import { useRecipeLoader } from "./hooks/useRecipeLoader";

// Create a child component that uses the hook
function RecipeDisplay() {
  const { 
    nutritionData, 
    cookingStepsData, 
    ingredientsData, 
    imageUrl, 
    isLoading 
  } = useRecipeLoader();

  if (isLoading) {
    return <div className="text-center p-10">Generating your meal plan...</div>;
  }
  
  // If there's no plan, show a default message
  if (!nutritionData.name || nutritionData.name === "Generate a Meal Plan!") {
    return <div className="text-center p-10">Go back to the homepage to create a meal plan.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-5 gap-x-12">
        <div className="md:col-span-2 flex flex-col gap-12">
          <ImagePlaceholder
            imageUrl={imageUrl}
            altText={nutritionData.name}
          />
          <CookingSteps steps={cookingStepsData} />
        </div>
        <div className="md:col-span-3 flex flex-col gap-12">
          <NutritionInfo {...nutritionData} />
          <IngredientsPrices ingredients={ingredientsData} />
        </div>
      </div>
    </div>
  );
}

// Wrap the child component in Suspense in the main export
export default function RecipePage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading recipe...</div>}>
      <RecipeDisplay />
    </Suspense>
  );
}