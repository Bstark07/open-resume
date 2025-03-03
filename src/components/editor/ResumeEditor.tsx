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
import { Mail, Phone, Linkedin } from 'lucide-react';

const defaultContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1, class: 'text-title font-bold' },
      content: [{ type: 'text', text: 'Your Name' }],
    },
    {
      type: 'paragraph',
      attrs: { class: 'text-body text-gray-600' },
      content: [
        { type: 'text', marks: [{ type: 'link', attrs: { href: 'mailto:' } }], text: 'email@example.com' },
        { type: 'text', text: ' • ' },
        { type: 'text', marks: [{ type: 'link', attrs: { href: 'tel:' } }], text: '(555) 555-5555' },
        { type: 'text', text: ' • ' },
        { type: 'text', marks: [{ type: 'link', attrs: { href: 'https://linkedin.com/in/' } }], text: 'linkedin.com/in/profile' },
      ],
    },
  ],
};

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
          HTMLAttributes: {
            levels: {
              1: 'text-title font-bold mt-[var(--spacing-xl)] mb-[var(--spacing-md)]',
              2: 'text-header font-semibold mt-[var(--spacing-lg)] mb-[var(--spacing-sm)]',
              3: 'text-subheading font-medium mt-[var(--spacing-md)] mb-[var(--spacing-xs)]',
            },
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'text-body mb-[var(--spacing-sm)]',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'ml-[var(--spacing-md)] mb-[var(--spacing-md)] space-y-[var(--spacing-xxs)]',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'ml-[var(--spacing-md)] mb-[var(--spacing-md)] space-y-[var(--spacing-xxs)]',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'text-body pl-[var(--spacing-xs)]',
          },
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
    content: initialContent || defaultContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON() as unknown as ResumeData);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-screen',
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
          <div className="flex flex-col gap-[var(--spacing-xs)] sm:flex-row sm:items-start sm:justify-between">
            <div className="w-full sm:w-2/3">
              <div className="flex items-center gap-[var(--spacing-xs)]">
                <EditorContent editor={editor} />
              </div>
            </div>
            <div className="w-full sm:w-1/3">
              <div className="flex flex-col gap-[var(--spacing-xs)] text-gray-600">
                <div className="flex items-center gap-[var(--spacing-xs)]">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:" className="hover:text-blue-600">email@example.com</a>
                </div>
                <div className="flex items-center gap-[var(--spacing-xs)]">
                  <Phone className="h-4 w-4" />
                  <a href="tel:" className="hover:text-blue-600">(555) 555-5555</a>
                </div>
                <div className="flex items-center gap-[var(--spacing-xs)]">
                  <Linkedin className="h-4 w-4" />
                  <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    linkedin.com/in/profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 