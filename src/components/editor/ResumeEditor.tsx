'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useCallback } from 'react';
import type { ResumeData } from '@/types/resume';
import FloatingToolbar from './FloatingToolbar';
import MobileToolbar from './MobileToolbar';

interface ResumeEditorProps {
  initialContent?: ResumeData;
  onChange?: (content: ResumeData) => void;
}

export default function ResumeEditor({ initialContent, onChange }: ResumeEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
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
        class: 'prose max-w-none focus:outline-none [&_p]:my-3 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl min-h-[11in] p-4',
      },
    },
  });

  const setContent = useCallback((content: ResumeData) => {
    editor?.commands.setContent(content);
  }, [editor]);

  return (
    <div className="min-h-screen bg-white">
      <MobileToolbar editor={editor} />
      <div className="mx-auto max-w-[8.5in] p-resume-lg">
        <FloatingToolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
} 