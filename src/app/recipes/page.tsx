"use client";

import ImagePlaceholder from "./components/ImagePlaceholder";
import NutritionInfo from "./components/NutritionInfo";
import CookingSteps from "./components/CookingSteps";
import IngredientsPrices from "./components/IngredientsPrices";
import { useRecipeLoader } from "./hooks/useRecipeLoader"; // Note the local hooks path

export default function RecipePage() {
  const { 
    nutritionData, 
    cookingStepsData, 
    ingredientsData, 
    imageUrl, 
    isLoading 
  } = useRecipeLoader();

  if (isLoading) {
    return <div className="text-center p-10">Loading meal plan...</div>;
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