type MessageAlertProps = {
  message: string
}

export default function MessageAlert({ message }: MessageAlertProps) {
  return <div>{message}</div>
}
