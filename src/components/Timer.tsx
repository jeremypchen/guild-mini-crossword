import { timerSecondsToMinutes } from '@/app/utils'
import { Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const Timer = () => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTimerVal = prev + 1
        return newTimerVal
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Text color="black" marginBottom="30px" fontSize="16px">
      {timerSecondsToMinutes(timer)}
    </Text>
  )
}

export default Timer
