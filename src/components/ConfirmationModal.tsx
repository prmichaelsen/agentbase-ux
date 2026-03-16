/**
 * ConfirmationModal — Themeable confirmation dialog with danger/warning/info variants.
 */

import { Modal } from './Modal'
import { useTheme } from '../lib/theming'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

const iconPaths: Record<string, string> = {
  danger: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmationModalProps) {
  const t = useTheme()

  const variantStyles: Record<string, { icon: string; button: string }> = {
    danger: { icon: 'bg-brand-danger', button: t.buttonDanger },
    warning: { icon: 'bg-brand-warning', button: t.buttonWarning },
    info: { icon: 'bg-brand-info', button: t.buttonSecondary },
  }

  const styles = variantStyles[variant]

  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose}>
      <div className="w-full">
        <div className="mb-6 flex justify-center">
          <div className={`flex h-16 w-16 items-center justify-center rounded-full ${styles.icon}`}>
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[variant]} />
            </svg>
          </div>
        </div>
        <h3 className={`mb-4 text-xl font-bold text-center ${t.textPrimary}`}>{title}</h3>
        <div className={`mb-6 text-center whitespace-pre-line ${t.textSecondary}`}>{message}</div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${t.buttonGhost} ${t.border} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${styles.button} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
