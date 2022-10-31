export function convertTimeToReadableFormat(time: number): string {
  const seconds = Math.floor(time / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  if (years) return `${years} year`
  if (days) return `${days} day`
  if (hours) return `${hours} hour`
  if (minutes) return `${minutes} min`

  return `${seconds} sec`
}
