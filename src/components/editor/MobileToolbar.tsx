'use client';

import { Editor } from '@tiptap/react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Link as LinkIcon,
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
} from 'lucide-react';

interface MobileToolbarProps {
  editor: Editor | null;
}

export default function MobileToolbar({ editor }: MobileToolbarProps) {
  if (!editor) return null;

  const toolbarButtons = [
    {
      icon: Heading2Icon,
      action: () => {
        if (editor.isActive('heading', { level: 2 })) {
          editor.chain().focus().setParagraph().run();
        } else {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }
      },
      isActive: editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2',
    },
    {
      icon: Heading3Icon,
      action: () => {
        if (editor.isActive('heading', { level: 3 })) {
          editor.chain().focus().setParagraph().run();
        } else {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }
      },
      isActive: editor.isActive('heading', { level: 3 }),
      tooltip: 'Heading 3',
    },
    {
      icon: BoldIcon,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      tooltip: 'Bold',
    },
    {
      icon: ItalicIcon,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      tooltip: 'Italic',
    },
    {
      icon: ListIcon,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      tooltip: 'Bullet List',
    },
    {
      icon: ListOrderedIcon,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      tooltip: 'Numbered List',
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
  ];

  return (
    <div className="sticky top-0 z-[var(--z-sticky)] border-b bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80 md:hidden">
      <div className="safe-area-inset-top" />
      <div className="scrollbar-none touch-manipulation flex items-center gap-[var(--spacing-xxs)] overflow-x-auto overscroll-x-contain p-[var(--spacing-xs)]">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`min-h-[var(--touch-target-size)] min-w-[var(--touch-target-size)] rounded-[var(--radius-lg)] p-[var(--spacing-sm)] transition-colors duration-[var(--transition-fast)] hover:bg-gray-100 active:bg-gray-200 ${
              button.isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600'
            }`}
            title={button.tooltip}
          >
            <button.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
} 