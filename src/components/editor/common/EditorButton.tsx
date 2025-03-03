import { type EditorButtonProps } from '@/types/editor';

export default function EditorButton({
  icon: Icon,
  action,
  isActive,
  tooltip,
  isTouchDevice = false,
}: EditorButtonProps) {
  return (
    <button
      onClick={action}
      className={`rounded-[var(--radius-lg)] transition-colors duration-[var(--transition-fast)] hover:bg-gray-100 active:bg-gray-200 ${
        isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600'
      } ${
        isTouchDevice
          ? 'min-h-[var(--touch-target-size)] min-w-[var(--touch-target-size)] p-[var(--spacing-sm)]'
          : 'p-[var(--spacing-xs)]'
      }`}
      title={tooltip}
    >
      <Icon
        className={`${isTouchDevice ? 'h-5 w-5' : 'h-4 w-4'}`}
      />
    </button>
  );
} 