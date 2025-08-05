export default function ActionButtons() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2">
      <button className="w-full bg-slate-900 text-white font-semibold py-2 px-3 rounded-lg hover:bg-slate-700 transition-colors text-sm">
        New Meal
      </button>
      <button className="w-full bg-transparent border border-slate-300 text-slate-700 font-semibold py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors text-sm">
        Edit
      </button>
      <button className="w-full bg-transparent border border-slate-300 text-slate-700 font-semibold py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors text-sm">
        Save
      </button>
    </div>
  );
}