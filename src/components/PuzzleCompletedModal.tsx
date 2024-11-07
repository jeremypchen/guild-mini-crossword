import { timerSecondsToMinutes } from '@/app/utils'
import { Button, Flex, useBreakpointValue, Image, Text } from '@chakra-ui/react'
import { IoShareSocialOutline } from 'react-icons/io5'

const PuzzleCompletedModal = ({
  secondsToComplete,
  onClose,
}: {
  secondsToComplete: number
  onClose: () => void
}) => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  return (
    <Flex
      zIndex={2}
      position="absolute"
      top={isMobile ? '50px' : '100px'}
      height={isMobile ? '' : '600px'}
      width={isMobile ? '360px' : '600px'}
      backgroundColor="#FED9DA"
      boxShadow="xs"
      rounded="md"
      direction="column"
      paddingY="50px"
      paddingX={isMobile ? '20px' : '50px'}
    >
      <Button
        position="absolute"
        top="0px"
        right="0px"
        onClick={onClose}
        background="transparent"
      >
        X
      </Button>

      <Image src="/guild_icon.svg" width="60px" />
      <Text fontSize="34px" color="black" fontWeight="bold" marginTop="10px">
        You did it!
      </Text>
      <Text color="black">
        You supported the Times Tech Guild by playing the Tech Guild's Strike
        edition of the Mini.
      </Text>

      <Flex
        marginTop="40px"
        borderTop="1px solid #1E1E1E"
        borderBottom="1px solid #1E1E1E"
        justifyContent="space-between"
        paddingY="10px"
        paddingX={isMobile ? '' : '40px'}
      >
        <Flex direction="column" alignItems="center">
          <Text fontSize="36px" color="#B42E2F" fontWeight="bold">
            {timerSecondsToMinutes(secondsToComplete)}
          </Text>
          <Text width="80px" textAlign="center" color="black">
            Time to complete
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text fontSize="36px" color="#B42E2F" fontWeight="bold">
            {daysSinceStrike()}
          </Text>
          <Text width="80px" textAlign="center" color="black">
            Days on strike
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text fontSize="36px" color="#B42E2F" fontWeight="bold">
            {daysSinceNegotiation()}
          </Text>
          <Text width="120px" textAlign="center" color="black">
            Days negotiating a fair contract
          </Text>
        </Flex>
      </Flex>

      <Button alignSelf="flex-end" background="transparent">
        <Flex gap="4px" fontWeight="bold">
          Share your results
          <IoShareSocialOutline />
        </Flex>
      </Button>
      <Button
        marginTop="20px"
        color="white"
        backgroundColor="#B42F2F"
        fontWeight="bold"
        fontSize={isMobile ? '16px' : '24px'}
        paddingY="30px"
        onClick={() =>
          window.open('https://nytimesguild.org/tech/guild-builds/index.html')
        }
      >
        New games, every day while we strike.
      </Button>

      <Text
        alignSelf="center"
        color="black"
        marginTop="14px"
        fontSize={isMobile ? '14px' : '18px'}
      >
        By the NYT Tech Guild
      </Text>
    </Flex>
  )
}

const daysSinceStrike = () => {
  const strikeDate = new Date('2024-11-4')
  const currentDate = new Date()
  const timeDiff = Math.abs(currentDate.getTime() - strikeDate.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}

const daysSinceNegotiation = () => {
  const strikeDate = new Date('2022-07-27')
  const currentDate = new Date()
  const timeDiff = Math.abs(currentDate.getTime() - strikeDate.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}

export default PuzzleCompletedModal
