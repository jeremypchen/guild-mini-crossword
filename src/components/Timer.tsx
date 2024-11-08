import { timerSecondsToMinutes } from '@/app/utils'
import { Text } from '@chakra-ui/react'
import { useEffect, SetStateAction } from 'react'

const Timer = ({
  isMobile,
  timer,
  setTimer,
  stopTimer,
}: {
  isMobile: boolean
  timer: number
  setTimer: React.Dispatch<SetStateAction<number>>
  stopTimer: boolean
}) => {
  useEffect(() => {
    if (stopTimer) return

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTimerVal = prev + 1
        return newTimerVal
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTimer, stopTimer])

  return (
    <Text
      color="black"
      marginBottom={isMobile ? '10px' : '20px'}
      fontSize="16px"
    >
      {timerSecondsToMinutes(timer)}
    </Text>
  )
}

export default Timer
