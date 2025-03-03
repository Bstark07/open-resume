'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import type { ResumeData } from '@/types/resume';
import type { Editor } from '@tiptap/react';
import { useEditor } from '@tiptap/react';
import { getEditorConfig, getTitleEditorConfig } from './config/editorConfig';
import { DEFAULT_CONTACT_DETAILS, DEFAULT_EDITOR_CONTENT, DEFAULT_TITLE_CONTENT } from '@/constants/editor';

// Dynamically import components that depend on browser APIs
const FloatingToolbar = dynamic(() => import('./FloatingToolbar'), { ssr: false });
const MobileToolbar = dynamic(() => import('./MobileToolbar'), { ssr: false });
const ActionButtons = dynamic(() => import('./ActionButtons'), { ssr: false });
const ContactSection = dynamic(() => import('./ContactSection'), { ssr: false });
const EditorContent = dynamic(
  () => import('@tiptap/react').then((mod) => mod.EditorContent),
  { ssr: false }
);

interface ResumeEditorProps {
  initialContent?: ResumeData;
  onChange?: (content: ResumeData) => void;
}

interface EditorEvents {
  editor: Editor;
}

const editorAttributes = {
  class: 'prose max-w-none focus:outline-none',
  'data-gramm': 'false',
};

export default function ResumeEditor({ initialContent, onChange }: ResumeEditorProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contactDetails, setContactDetails] = useState(DEFAULT_CONTACT_DETAILS);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const titleEditor = useEditor(
    {
      ...getTitleEditorConfig(),
      content: DEFAULT_TITLE_CONTENT,
      editorProps: {
        attributes: editorAttributes,
      },
      onCreate: ({ editor }) => {
        editor.setOptions({ editable: true });
      },
      onUpdate: ({ editor }) => {
        if (onChange && mainEditor) {
          const titleContent = editor.getHTML();
          const mainContent = mainEditor.getHTML();
          
          const combinedContent = {
            ...initialContent,
            basics: {
              ...initialContent?.basics,
              name: editor.getText(),
            },
            content: mainContent,
          };
          
          onChange(combinedContent as ResumeData);
        }
      },
    },
    [initialContent, onChange]
  );

  const mainEditor = useEditor(
    {
      ...getEditorConfig(),
      content: initialContent?.content || DEFAULT_EDITOR_CONTENT,
      editorProps: {
        attributes: {
          ...editorAttributes,
          class: 'prose max-w-none focus:outline-none min-h-screen',
        },
      },
      onCreate: ({ editor }) => {
        editor.setOptions({ editable: true });
      },
      onUpdate: ({ editor }) => {
        if (onChange && titleEditor) {
          const combinedContent = {
            ...initialContent,
            basics: {
              ...initialContent?.basics,
              name: titleEditor.getText(),
            },
            content: editor.getHTML(),
          };
          
          onChange(combinedContent as ResumeData);
        }
      },
    },
    [initialContent, onChange]
  );

  const setContent = useCallback((content: ResumeData) => {
    if (content.basics?.name && titleEditor) {
      titleEditor.commands.setContent(`<h1>${content.basics.name}</h1>`);
    }
    if (content.content && mainEditor) {
      mainEditor.commands.setContent(content.content);
    }
  }, [titleEditor, mainEditor]);

  const handleExport = useCallback(() => {
    // TODO: Implement export functionality
    console.log('Export clicked');
  }, []);

  if (!isClient) {
    return <div className="min-h-screen bg-white" />; // Show a blank page during SSR
  }

  return (
    <div className="min-h-screen bg-white">
      <MobileToolbar editor={mainEditor} />
      <ActionButtons onExport={handleExport} />
      <div className="resume-container">
        <FloatingToolbar editor={mainEditor} />
        <div className="section rounded-lg bg-white p-[var(--spacing-md)] shadow-sm sm:p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]">
          <div className="mb-[var(--spacing-lg)] border-b pb-[var(--spacing-md)]">
            <div className="flex flex-col gap-[var(--spacing-md)] sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full sm:w-2/3">
                <div className="prose max-w-none focus-within:outline-none">
                  <EditorContent editor={titleEditor} />
                </div>
              </div>
              <div className="w-full sm:w-1/3">
                <ContactSection 
                  contactDetails={contactDetails}
                  onContactChange={setContactDetails}
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <EditorContent editor={mainEditor} />
          </div>
        </div>
      </div>
    </div>
  );
} 