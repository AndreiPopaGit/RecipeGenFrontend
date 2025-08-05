export default function LayoutSquare({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-96 border-2 border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-center">
      {children}
    </div>
  );
}