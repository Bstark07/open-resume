'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useCallback, useEffect, useState } from 'react';
import type { ResumeData } from '@/types/resume';
import FloatingToolbar from './FloatingToolbar';
import MobileToolbar from './MobileToolbar';

interface ResumeEditorProps {
  initialContent?: ResumeData;
  onChange?: (content: ResumeData) => void;
}

export default function ResumeEditor({ initialContent, onChange }: ResumeEditorProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: initialContent || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON() as unknown as ResumeData);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[11in] sm:min-h-0',
      },
    },
  });

  const setContent = useCallback((content: ResumeData) => {
    editor?.commands.setContent(content);
  }, [editor]);

  return (
    <div className="min-h-screen bg-white">
      <MobileToolbar editor={editor} />
      <div className="resume-container">
        <FloatingToolbar editor={editor} />
        <div className="section rounded-lg bg-white p-[var(--spacing-md)] shadow-sm sm:p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
} 