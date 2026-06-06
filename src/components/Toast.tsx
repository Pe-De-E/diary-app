interface ToastProps {
  show: boolean
  message: string
  description?: string
  onClose: () => void
}

function Toast({ show, message, description, onClose }: ToastProps) {
  if (!show) return null

  return (
    <div className="toast toast-top toast-center z-50">
      <div className="alert alert-info flex flex-col items-start gap-1">
        <span className="font-medium">{message}</span>
        {description && <span className="text-sm">{description}</span>}
        <button className="btn btn-xs btn-ghost self-end" onClick={onClose}>✕</button>
      </div>
    </div>
  )
}

export default Toast
