import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Link,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from 'lucide-react';
import type { EditorButtonProps } from '@/types/editor';

export const getTextControls = (editor: Editor): Omit<EditorButtonProps, 'isTouchDevice'>[] => [
  {
    icon: Heading2,
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
    icon: Heading3,
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
];

export const getFormatControls = (editor: Editor): Omit<EditorButtonProps, 'isTouchDevice'>[] => [
  {
    icon: Bold,
    action: () => editor.chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold'),
    tooltip: 'Bold (Ctrl+B)',
  },
  {
    icon: Italic,
    action: () => editor.chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic'),
    tooltip: 'Italic (Ctrl+I)',
  },
];

export const getListControls = (editor: Editor): Omit<EditorButtonProps, 'isTouchDevice'>[] => [
  {
    icon: List,
    action: () => editor.chain().focus().toggleBulletList().run(),
    isActive: editor.isActive('bulletList'),
    tooltip: 'Bullet List',
  },
  {
    icon: ListOrdered,
    action: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor.isActive('orderedList'),
    tooltip: 'Numbered List',
  },
];

export const getInsertControls = (editor: Editor): Omit<EditorButtonProps, 'isTouchDevice'>[] => [
  {
    icon: Link,
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