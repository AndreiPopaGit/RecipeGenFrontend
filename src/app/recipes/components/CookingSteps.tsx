interface Step {
  title: string;
  description: string;
}

interface CookingStepsProps {
  steps: Step[];
}

export default function CookingSteps({ steps }: CookingStepsProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Cooking Steps</h2>
      <div className="relative border-l-2 border-dashed border-slate-300">
        {steps.map((step, index) => (
          <div key={index} className="mb-10 ml-8">
            <span className="absolute -left-[1.05rem] flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full ring-8 ring-slate-50">
              <span className="text-sm font-bold text-orange-600">{index + 1}</span>
            </span>
            <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="text-slate-500">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}