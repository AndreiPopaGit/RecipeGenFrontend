"use client";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  // If not loading, render nothing
  if (!isLoading) {
    return null;
  }

  return (
    // Main container for the overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-white">
        {/* Spinner element */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
        {/* Loading message */}
        <p className="text-lg font-semibold">
          Generating your personalized meal plan...
        </p>
      </div>
    </div>
  );
}