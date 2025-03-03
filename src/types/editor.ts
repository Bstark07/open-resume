import { Editor } from '@tiptap/react';
import { LucideIcon } from 'lucide-react';

export interface ContactDetail {
  url: string;
  text: string;
}

export interface ContactDetails {
  email: ContactDetail;
  phone: ContactDetail;
  linkedin: ContactDetail;
}

export interface EditorButtonProps {
  icon: LucideIcon;
  action: () => void;
  isActive: boolean;
  tooltip: string;
  isTouchDevice?: boolean;
}

export interface ToolbarProps {
  editor: Editor | null;
}

export type ContactType = 'email' | 'phone' | 'linkedin';

export interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  title: string;
} 