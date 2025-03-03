'use client';

import { useCallback, useEffect, useState } from 'react';
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
    if (!editor?.view) return;

    const selection = window.getSelection();
    if (!selection) {
      setIsVisible(false);
      return;
    }
    const isEmptySelection = selection.isCollapsed;

    // Show toolbar on empty selection (cursor) or text selection
    if (!selection.rangeCount) {
      setIsVisible(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Show toolbar immediately when typing '/' or selecting text
    const isSlashCommand = editor.state.doc.textBetween(
      Math.max(0, editor.state.selection.from - 1),
      editor.state.selection.from
    ) === '/';

    if (isSlashCommand || !isEmptySelection) {
      // Position the toolbar above the selection
      const toolbarHeight = isTouchDevice ? 60 : 40;
      const verticalOffset = 10; // Gap between toolbar and text
      
      // Calculate position
      const top = Math.max(
        rect.top - toolbarHeight - verticalOffset + window.scrollY,
        10
      );
      
      // Center horizontally above the selection
      const left = rect.left + rect.width / 2;

      setPosition({ top, left });
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [editor, isTouchDevice]);

  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        updateToolbarPosition();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const toolbar = document.querySelector('.floating-toolbar');
      const target = event.target as Node;
      
      // Check if click is outside both toolbar and editor
      if (toolbar && !toolbar.contains(target) && !editor.view.dom.contains(target)) {
        setIsVisible(false);
      }
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection?.toString()) {
        setIsVisible(false);
      } else {
        updateToolbarPosition();
      }
    };

    editor.on('selectionUpdate', handleSelectionChange);
    editor.on('focus', updateToolbarPosition);
    editor.on('blur', () => {
      // Small delay to allow for toolbar clicks to register
      setTimeout(() => {
        const activeElement = document.activeElement;
        const toolbar = document.querySelector('.floating-toolbar');
        if (toolbar && !toolbar.contains(activeElement)) {
          setIsVisible(false);
        }
      }, 100);
    });

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', updateToolbarPosition);
    window.addEventListener('scroll', updateToolbarPosition);

    return () => {
      editor.off('selectionUpdate', handleSelectionChange);
      editor.off('focus', updateToolbarPosition);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updateToolbarPosition);
      window.removeEventListener('scroll', updateToolbarPosition);
    };
  }, [editor, updateToolbarPosition]);

  if (!editor || !isVisible) return null;

  interface ToolbarButton {
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    isActive: boolean;
    tooltip: string;
  }

  const textControls: ToolbarButton[] = [
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
  ];

  const formatControls: ToolbarButton[] = [
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
  ];

  const listControls: ToolbarButton[] = [
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
  ];

  const insertControls: ToolbarButton[] = [
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

  const renderButtonGroup = (buttons: ToolbarButton[]) => (
    <div className="flex items-center gap-[var(--spacing-xxs)]">
      {buttons.map((button, index) => (
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
  );

  return (
    <div
      className={`floating-toolbar fixed z-[var(--z-popover)] -translate-x-1/2 transform rounded-[var(--radius-lg)] bg-white p-[var(--spacing-xxs)] shadow-lg ring-1 ring-black/10 transition-all duration-[var(--transition-normal)] ${
        isTouchDevice ? 'touch-manipulation' : ''
      }`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="flex items-center divide-x divide-gray-200">
        {renderButtonGroup(textControls)}
        <div className="pl-[var(--spacing-xxs)]">{renderButtonGroup(formatControls)}</div>
        <div className="pl-[var(--spacing-xxs)]">{renderButtonGroup(listControls)}</div>
        <div className="pl-[var(--spacing-xxs)]">{renderButtonGroup(insertControls)}</div>
      </div>
    </div>
  );
} 