'use client';

import { Download, LineChart, Coffee, Music } from 'lucide-react';

interface ActionButtonsProps {
  onExport?: () => void;
}

export default function ActionButtons({ onExport }: ActionButtonsProps) {
  return (
    <div className="fixed bottom-[var(--spacing-md)] left-1/2 z-[var(--z-sticky)] flex -translate-x-1/2 items-center gap-[var(--spacing-sm)] rounded-[var(--radius-lg)] bg-white/95 p-2 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/80">
      <button
        onClick={() => console.log('Analysis clicked')}
        className="rounded-[var(--radius-md)] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        title="ATS Analysis"
      >
        <LineChart className="h-5 w-5" />
      </button>
      <button
        onClick={() => console.log('Coffee clicked')}
        className="rounded-[var(--radius-md)] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        title="Buy me a coffee"
      >
        <Coffee className="h-5 w-5" />
      </button>
      <button
        onClick={() => console.log('Music clicked')}
        className="rounded-[var(--radius-md)] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        title="Background music"
      >
        <Music className="h-5 w-5" />
      </button>
      <button
        onClick={onExport}
        className="rounded-[var(--radius-md)] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        title="Export"
      >
        <Download className="h-5 w-5" />
      </button>
    </div>
  );
} 