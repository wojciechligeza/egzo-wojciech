type MessageAlertProps = {
  message: string
}

export default function MessageAlert({ message }: MessageAlertProps) {
  return (
    <div className="mx-auto mt-6 flex w-1/2 items-center gap-4 rounded-full bg-red-100 p-2 text-red-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 text-red-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <div className="text-sm font-semibold">{message}</div>
    </div>
  )
}
