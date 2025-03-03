'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useCallback, useEffect, useState } from 'react';
import type { ResumeData } from '@/types/resume';
import FloatingToolbar from './FloatingToolbar';
import MobileToolbar from './MobileToolbar';
import ActionButtons from './ActionButtons';
import ContactSection from './ContactSection';
import { getEditorConfig, getTitleEditorConfig } from './config/editorConfig';
import { DEFAULT_CONTACT_DETAILS, DEFAULT_EDITOR_CONTENT, DEFAULT_TITLE_CONTENT } from '@/constants/editor';

interface ResumeEditorProps {
  initialContent?: ResumeData;
  onChange?: (content: ResumeData) => void;
}

export default function ResumeEditor({ initialContent, onChange }: ResumeEditorProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [contactDetails, setContactDetails] = useState(DEFAULT_CONTACT_DETAILS);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const titleEditor = useEditor({
    ...getTitleEditorConfig(),
    content: DEFAULT_TITLE_CONTENT,
    onUpdate: ({ editor }) => {
      if (onChange && mainEditor) {
        // Get the title content
        const titleContent = editor.getHTML();
        
        // Get the main content without the title
        const mainContent = mainEditor.getHTML();
        
        // Combine them for the final output
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
  });

  const mainEditor = useEditor({
    ...getEditorConfig(),
    content: initialContent || DEFAULT_EDITOR_CONTENT,
    onUpdate: ({ editor }) => {
      if (onChange && titleEditor) {
        // Combine title and main content
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
  });

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

  return (
    <div className="min-h-screen bg-white">
      <MobileToolbar editor={mainEditor} />
      <ActionButtons onExport={handleExport} />
      <div className="resume-container">
        <FloatingToolbar editor={mainEditor} />
        <div className="section rounded-lg bg-white p-[var(--spacing-md)] shadow-sm sm:p-[var(--spacing-lg)] md:p-[var(--spacing-xl)]">
          {/* Header Section with Title and Contact Details */}
          <div className="mb-[var(--spacing-lg)] border-b pb-[var(--spacing-md)]">
            <div className="flex flex-col gap-[var(--spacing-md)] sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full sm:w-2/3">
                {/* Title Block */}
                <div className="prose max-w-none focus-within:outline-none">
                  <EditorContent editor={titleEditor} />
                </div>
              </div>
              <div className="w-full sm:w-1/3">
                {/* Contact Details Block */}
                <ContactSection 
                  contactDetails={contactDetails}
                  onContactChange={setContactDetails}
                />
              </div>
            </div>
          </div>

          {/* Full-width Document Editing Area */}
          <div className="w-full">
            <EditorContent editor={mainEditor} />
          </div>
        </div>
      </div>
    </div>
  );
} 