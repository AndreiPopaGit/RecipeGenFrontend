import { ReactNode } from 'react';
import ActionButtons from './ActionButtons';

interface NutritionInfoProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

function MacroCard({ label, value, unit, color, icon }: { label: string, value: number, unit: string, color: string, icon: ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
      <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
        <span>{label}</span>
        {icon}
      </div>
      <p className="text-slate-900 text-xl font-bold">
        {value} <span className="text-sm font-medium text-slate-500">{unit}</span>
      </p>
      <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5">
        <div className={color} style={{ width: `${value * 2}%` }}></div>
      </div>
    </div>
  );
}

export default function NutritionInfo({ name, calories, protein, carbs, fat }: NutritionInfoProps) {
  const macros = [
    { label: "Protein", value: protein, unit: "g", color: "h-1 rounded-full bg-blue-500", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { label: "Carbs", value: carbs, unit: "g", color: "h-1 rounded-full bg-green-500", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { label: "Fat", value: fat, unit: "g", color: "h-1 rounded-full bg-yellow-500", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
  ];

  return (
    <div className="flex flex-col justify-between p-4 select-none text-center h-96">
      <div>
        <h1 className="text-slate-900 text-2xl font-bold line-clamp-2" title={name}>
          {name}
        </h1>
      </div>

      <div>
        <div className="flex items-baseline justify-center gap-1">
          <p className="text-slate-900 text-5xl font-extrabold tracking-tighter">{calories}</p>
          <p className="text-base font-medium text-slate-500">kcal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {macros.map(macro => <MacroCard key={macro.label} {...macro} />)}
      </div>
      
      <ActionButtons />
    </div>
  );
}