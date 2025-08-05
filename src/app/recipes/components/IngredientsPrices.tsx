"use client";

import React, { useState, useMemo } from 'react';

interface Price {
  store: string;
  price: number;
}

interface Ingredient {
  name: string;
  quantity: string;
  prices: Price[];
}

interface IngredientsPricesProps {
  ingredients: Ingredient[];
}

export default function IngredientsPrices({ ingredients }: IngredientsPricesProps) {
  const allStores = useMemo(() => {
    if (!ingredients || ingredients.length === 0) return [];
    const storeSet = new Set<string>();
    ingredients.forEach(ingredient => {
      ingredient.prices.forEach(p => storeSet.add(p.store));
    });
    return Array.from(storeSet).sort();
  }, [ingredients]);

  const findBestStore = (prices: Price[]) => {
    if (!prices || prices.length === 0) return null;
    // Filter out prices of 0 unless all prices are 0
    const validPrices = prices.filter(p => p.price > 0);
    const pricesToConsider = validPrices.length > 0 ? validPrices : prices;
    return pricesToConsider.reduce((best, current) => current.price < best.price ? current : best).store;
  };

  const [selectedStores, setSelectedStores] = useState(() => {
    const initialSelections: { [key: string]: string | null } = {};
    ingredients.forEach(ingredient => {
      initialSelections[ingredient.name] = findBestStore(ingredient.prices);
    });
    return initialSelections;
  });

  const handleSelectStore = (ingredientName: string, storeName: string) => {
    setSelectedStores(prev => ({
      ...prev,
      [ingredientName]: storeName,
    }));
  };
  
  // Don't render the component if there's no data or stores to display
  if (ingredients.length === 0 || allStores.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-3xl font-bold mb-6">Ingredients & Prices</h2>
      
      <div 
        className="grid items-center gap-y-4 gap-x-6" 
        style={{ gridTemplateColumns: `2fr repeat(${allStores.length}, 1fr)` }}
      >
        <div className="font-semibold text-slate-500 text-sm">Ingredient</div>
        {allStores.map(store => (
          <div key={store} className="font-semibold text-slate-500 text-sm text-center">{store}</div>
        ))}

        {ingredients.map(ingredient => (
          <React.Fragment key={ingredient.name}>
            <div className="font-semibold text-slate-800">{ingredient.name}</div>
            {allStores.map(store => {
              const priceInfo = ingredient.prices.find(p => p.store === store);
              const isSelected = selectedStores[ingredient.name] === store;

              return (
                <div key={store} className="text-center">
                  {priceInfo ? (
                    <button
                      onClick={() => handleSelectStore(ingredient.name, store)}
                      className={`w-full py-2 rounded-md transition-all duration-150
                        ${isSelected 
                          ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-600 ring-offset-2' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                    >
                      €{priceInfo.price.toFixed(2)}
                    </button>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}