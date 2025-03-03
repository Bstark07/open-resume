import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { EDITOR_CLASSES } from '@/constants/editor';

export const getTitleEditorConfig = () => ({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1],
        HTMLAttributes: {
          levels: {
            1: {
              class: 'text-[var(--font-title)] font-bold mt-0 mb-[var(--spacing-md)] outline-none',
            }
          }
        }
      },
      paragraph: false,
      bulletList: false,
      orderedList: false,
      listItem: false,
      horizontalRule: false,
      blockquote: false,
      code: false,
      codeBlock: false,
      hardBreak: false,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose max-w-none focus:outline-none',
    },
  },
});

export const getEditorConfig = () => ({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [2, 3],
        HTMLAttributes: {
          levels: {
            2: {
              class: 'text-header font-semibold mt-[var(--spacing-lg)] mb-[var(--spacing-sm)]'
            },
            3: {
              class: 'text-subheading font-medium mt-[var(--spacing-md)] mb-[var(--spacing-xs)]'
            }
          }
        }
      },
      paragraph: {
        HTMLAttributes: {
          class: EDITOR_CLASSES.paragraph,
        },
      },
      bulletList: {
        HTMLAttributes: {
          class: EDITOR_CLASSES.bulletList,
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: EDITOR_CLASSES.orderedList,
        },
      },
      listItem: {
        HTMLAttributes: {
          class: EDITOR_CLASSES.listItem,
        },
      },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: EDITOR_CLASSES.link,
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose max-w-none focus:outline-none min-h-screen',
    },
  },
}); 