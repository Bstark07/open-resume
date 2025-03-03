'use client';

import { Editor } from '@tiptap/react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  Heading1 as Heading1Icon,
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
} from 'lucide-react';

interface MobileToolbarProps {
  editor: Editor | null;
}

export default function MobileToolbar({ editor }: MobileToolbarProps) {
  if (!editor) return null;

  const toolbarButtons = [
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
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleMark('underline').run(),
      isActive: editor.isActive('underline'),
      tooltip: 'Underline',
    },
    {
      icon: Heading1Icon,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      tooltip: 'Heading 1',
    },
    {
      icon: Heading2Icon,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2',
    },
    {
      icon: Heading3Icon,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      tooltip: 'Heading 3',
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
    <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm md:hidden">
      <div className="flex flex-wrap items-center gap-0.5 p-1">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`rounded p-2 transition-colors hover:bg-gray-100 ${
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