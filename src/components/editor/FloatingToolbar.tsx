'use client';

import { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
} from 'lucide-react';

interface FloatingToolbarProps {
  editor: Editor | null;
}

export default function FloatingToolbar({ editor }: FloatingToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const updateToolbarPosition = useCallback(() => {
    if (!editor?.view || !editor.isActive) return;

    const selection = window.getSelection();
    if (!selection?.rangeCount || selection.isCollapsed) {
      setIsVisible(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Position the toolbar above the selection with proper spacing
    setPosition({
      top: Math.max(rect.top - (isTouchDevice ? 60 : 50) + window.scrollY, 10),
      left: Math.min(Math.max(rect.left + rect.width / 2, 100), window.innerWidth - 100),
    });
    setIsVisible(true);
  }, [editor, isTouchDevice]);

  useEffect(() => {
    if (!editor) return;

    document.addEventListener('selectionchange', updateToolbarPosition);
    window.addEventListener('resize', updateToolbarPosition);
    window.addEventListener('scroll', updateToolbarPosition);

    return () => {
      document.removeEventListener('selectionchange', updateToolbarPosition);
      window.removeEventListener('resize', updateToolbarPosition);
      window.removeEventListener('scroll', updateToolbarPosition);
    };
  }, [editor, updateToolbarPosition]);

  if (!editor || !isVisible) return null;

  const toolbarButtons = [
    {
      icon: BoldIcon,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      tooltip: 'Bold (Ctrl+B)',
    },
    {
      icon: ItalicIcon,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      tooltip: 'Italic (Ctrl+I)',
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleMark('underline').run(),
      isActive: editor.isActive('underline'),
      tooltip: 'Underline (Ctrl+U)',
    },
    {
      icon: LinkIcon,
      action: () => {
        const url = window.prompt('Enter URL');
        if (url) {
          editor.chain().focus().toggleLink({ href: url }).run();
        }
      },
      isActive: editor.isActive('link'),
      tooltip: 'Add Link',
    },
    {
      icon: AlignLeftIcon,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
      tooltip: 'Align Left',
    },
    {
      icon: AlignCenterIcon,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
      tooltip: 'Align Center',
    },
    {
      icon: AlignRightIcon,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: editor.isActive({ textAlign: 'right' }),
      tooltip: 'Align Right',
    },
  ];

  return (
    <div
      className={`fixed z-[var(--z-popover)] -translate-x-1/2 transform rounded-[var(--radius-lg)] bg-white p-[var(--spacing-xxs)] shadow-lg ring-1 ring-black/10 transition-all duration-[var(--transition-normal)] ${
        isTouchDevice ? 'touch-manipulation' : ''
      }`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="flex items-center gap-[var(--spacing-xxs)]">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`rounded-[var(--radius-md)] p-[var(--spacing-xs)] transition-colors duration-[var(--transition-fast)] hover:bg-gray-100 active:bg-gray-200 ${
              button.isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600'
            } ${
              isTouchDevice
                ? 'min-h-[var(--touch-target-size)] min-w-[var(--touch-target-size)]'
                : ''
            }`}
            title={button.tooltip}
          >
            <button.icon
              className={`${
                isTouchDevice ? 'h-5 w-5' : 'h-4 w-4'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
} 