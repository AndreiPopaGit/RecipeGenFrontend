"use client";

import { useState, useCallback } from 'react';
import FormCard from "./components/FormCard";
import CustomDropdown from './components/CustomDropdown';
import CuisineSelector from './components/CuisineSelector';
import { useMealPlanner } from './hooks/useMealPlanner';

// Options data
const goalOptions = [
  { value: 'weight-loss', label: 'Lose Weight', icon: '📉' },
  { value: 'muscle-gain', label: 'Build Muscle', icon: '💪' },
  { value: 'maintenance', label: 'Maintain Weight', icon: '🎯' },
];
const timeOptions = [
  { value: 'quick', label: 'Under 30 mins', icon: '⚡' },
  { value: 'moderate', label: '30-60 mins', icon: '👨‍🍳' },
  { value: 'long', label: '60+ mins', icon: '🍲' },
];
const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian', icon: '🌱' },
  { value: 'vegan', label: 'Vegan', icon: '🌿' },
  { value: 'keto', label: 'Ketogenic', icon: '🥑' },
  { value: 'paleo', label: 'Paleo', icon: '🥩' },
];
const cuisineOptions = [
  { value: 'italian', label: 'Italian', icon: '🇮🇹' },
  { value: 'asian', label: 'Asian', icon: '🥢' },
  { value: 'mexican', label: 'Mexican', icon: '🌮' },
  { value: 'american', label: 'American', icon: '🍔' },
  { value: 'mediterranean', label: 'Mediterranean', icon: '𫒒' },
  { value: 'indian', label: 'Indian', icon: '🍛' },
  { value: 'thai', label: 'Thai', icon: '🌶️' },
  { value: 'french', label: 'French', icon: '🥐' },
];

export default function MealPlannerPage() {
  const [formData, setFormData] = useState({
    goal: '',
    specificDiet: '',
    cuisines: [],
    likedIngredients: '',
    dislikedIngredients: '',
    cookingTime: '',
  });
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { generatePlan, data, isLoading, error } = useMealPlanner();

  const handleFormChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const handleDropdownToggle = useCallback((dropdownName: string) => {
    setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generatePlan(formData);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.2)]">
            AI Meal Planner
          </h1>
          <p className="text-xl text-white/90 mt-2">
            Personalized nutrition in seconds
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormCard 
              icon={"🎯"} title="Your Goal" subtitle="Main objective" accentColor="from-sky-400 to-blue-600"
              className={openDropdown === 'goal' ? 'z-20' : 'z-10'}
            >
              <CustomDropdown 
                options={goalOptions}
                value={formData.goal}
                onChange={(value) => handleFormChange('goal', value)}
                placeholder="Select your goal"
                isOpen={openDropdown === 'goal'}
                onToggle={() => handleDropdownToggle('goal')}
              />
            </FormCard>

            <FormCard 
              icon={"⏰"} title="Cooking Time" subtitle="How much time you have" accentColor="from-emerald-400 to-teal-500"
              className={openDropdown === 'cookingTime' ? 'z-20' : 'z-10'}
            >
              <CustomDropdown 
                options={timeOptions}
                value={formData.cookingTime}
                onChange={(value) => handleFormChange('cookingTime', value)}
                placeholder="Select cooking time"
                isOpen={openDropdown === 'cookingTime'}
                onToggle={() => handleDropdownToggle('cookingTime')}
              />
            </FormCard>

            <FormCard 
              icon={"🥗"} title="Specific Diet" subtitle="Optional dietary needs" accentColor="from-amber-400 to-orange-500" 
              className={`lg:col-span-2 ${openDropdown === 'diet' ? 'z-20' : 'z-10'}`}
            >
              <CustomDropdown 
                options={dietOptions}
                value={formData.specificDiet}
                onChange={(value) => handleFormChange('specificDiet', value)}
                placeholder="Select a specific diet"
                isOpen={openDropdown === 'diet'}
                onToggle={() => handleDropdownToggle('diet')}
              />
            </FormCard>
            
            <FormCard 
              icon={"🌍"} 
              title="Favorite Cuisines" 
              subtitle="No selection limit" 
              accentColor="from-teal-300 to-cyan-500" 
              className="lg:col-span-4"
              disableHoverEffect={true}
            >
              <CuisineSelector
                options={cuisineOptions}
                selectedCuisines={formData.cuisines}
                onChange={(value) => handleFormChange('cuisines', value)}
              />
            </FormCard>

            <FormCard icon={"😋"} title="Liked Ingredients" subtitle="List your favorites" accentColor="from-rose-400 to-red-500" className="lg:col-span-2">
               <textarea 
                  className="w-full p-3 bg-slate-100/80 rounded-2xl text-slate-800 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="e.g., salmon, avocado, spicy food..."
                  value={formData.likedIngredients}
                  onChange={(e) => handleFormChange('likedIngredients', e.target.value)}
               />
            </FormCard>
            
            <FormCard icon={"🚫"} title="Disliked Ingredients" subtitle="Dislikes & restrictions" accentColor="from-violet-400 to-purple-500" className="lg:col-span-2">
               <textarea 
                  className="w-full p-3 bg-slate-100/80 rounded-2xl text-slate-800 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-violet-400"
                  placeholder="e.g., mushrooms, cilantro, high-lactose..."
                  value={formData.dislikedIngredients}
                  onChange={(e) => handleFormChange('dislikedIngredients', e.target.value)}
               />
            </FormCard>
            
            <div className="lg:col-span-4 mt-4">
              <button 
                type="submit" 
                className="w-full text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-2xl py-4 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate My Meal Plan 🚀'}
              </button>
            </div>
          </div>
        </form>
        {error && <p className="text-red-300 text-center mt-4">Error: {error}</p>}
      </div>
    </div>
  );
}