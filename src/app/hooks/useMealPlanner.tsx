import { useState } from 'react';
import axios from 'axios';

interface FormData {
  goal: string;
  specificDiet: string;
  cuisines: string[];
  likedIngredients: string;
  dislikedIngredients: string;
  cookingTime: string;
}

export const useMealPlanner = () => {
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
      
      // On success, save the entire response to localStorage
      localStorage.setItem('mealPlan', JSON.stringify(response.data));

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