export function formatTime(seconds: number): string {
  const minutesNum = Math.floor(seconds / 60)
  const secondsNum = seconds - minutesNum * 60
  
  if(minutesNum < 1) return seconds.toString()
  if(secondsNum < 10) return `${minutesNum}:0${secondsNum}`
  return `${minutesNum}:${secondsNum}`
}

export default function calcTime (endTime: number): string {
    const remainingMs = endTime - Date.now()
    const remainingSeconds = Math.round(remainingMs / 1000)
    const remainingMinutes = formatTime(remainingSeconds)
    return remainingMinutes
}