import React, { ReactNode } from 'react';

interface FormCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  children: ReactNode;
  className?: string;
  disableHoverEffect?: boolean;
}

export default React.memo(function FormCard({ icon, title, subtitle, accentColor, children, className, disableHoverEffect = false }: FormCardProps) {
  
  const hoverClasses = !disableHoverEffect
    ? 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10'
    : '';

  return (
    <div
      className={`
        relative rounded-3xl border border-white/40 bg-white/95 p-7 
        shadow-lg shadow-black/5 backdrop-blur-xl 
        transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] 
        ${hoverClasses}
        ${className}
      `}
    >
      <div className={`absolute left-0 top-0 h-1.5 w-full rounded-t-3xl bg-gradient-to-r ${accentColor}`}></div>
      
      <div 
        className="
          absolute -top-1/2 -right-1/2 h-full w-full opacity-0 
          bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] 
          transition-all duration-700 ease-in-out group-hover:opacity-100
        "
      ></div>

      <div className="mb-5 flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white shadow-md ${accentColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-800">{title}</h3>
          <p className="text-base font-medium text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
});