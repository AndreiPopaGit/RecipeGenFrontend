import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import the router

interface FormData {
  goal: string;
  specificDiet: string;
  cuisines: string[];
  likedIngredients: string;
  dislikedIngredients: string;
  cookingTime: string;
}

export const useMealPlanner = () => {
  const router = useRouter(); // Initialize the router
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePlan = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      mainGoal: formData.goal,
      specificDiet: formData.specificDiet,
      cuisines: formData.cuisines,
      likedIngredients: formData.likedIngredients,
      dislikedIngredients: formData.dislikedIngredients,
      cookingTime: formData.cookingTime,
    };

    console.log('Sending this data to backend:', requestBody);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/generate`;
      const response = await axios.post(apiUrl, requestBody);
      
      // Instead of saving to localStorage, prepare data for URL
      const mealPlanData = JSON.stringify(response.data);
      const encodedData = encodeURIComponent(mealPlanData);
      
      // Navigate to the recipes page with the data in the query
      router.push(`/recipes?data=${encodedData}`);

      setData(response.data);
      console.log('Response from backend:', response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred';
      setError(errorMessage);
      console.error('There was an error submitting the form:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { generatePlan, data, isLoading, error };
};