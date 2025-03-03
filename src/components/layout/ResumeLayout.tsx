import type { ResumeData } from '@/types/resume';
import { type ReactNode } from 'react';

interface ResumeLayoutProps {
  data?: ResumeData;
  children?: ReactNode;
  className?: string;
}

export default function ResumeLayout({ data, children, className = '' }: ResumeLayoutProps) {
  return (
    <div className={`min-h-[11in] w-[8.5in] bg-white shadow-lg print:shadow-none ${className}`}>
      <div className="h-full p-resume-lg">
        <header className="mb-8 border-b pb-4">
          {data?.basics?.name && (
            <h1 className="text-3xl font-bold">{data.basics.name}</h1>
          )}
          {data?.basics?.label && (
            <p className="text-lg text-gray-600">{data.basics.label}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
            {data?.basics?.email && (
              <a href={`mailto:${data.basics.email}`} className="hover:text-gray-900">
                {data.basics.email}
              </a>
            )}
            {data?.basics?.phone && (
              <a href={`tel:${data.basics.phone}`} className="hover:text-gray-900">
                {data.basics.phone}
              </a>
            )}
            {data?.basics?.url && (
              <a href={data.basics.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                {data.basics.url}
              </a>
            )}
          </div>
        </header>
        <main className="space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
} 