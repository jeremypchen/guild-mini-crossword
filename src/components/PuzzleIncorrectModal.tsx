import { Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

const PuzzleIncorrectModal = ({ onClose }: { onClose: () => void }) => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  return (
    <Flex
      position="absolute"
      top={isMobile ? '30vh' : '200px'}
      height={isMobile ? '300px' : '400px'}
      width={isMobile ? '320px' : '400px'}
      zIndex={100}
      justifyContent="center"
      alignItems="center"
      direction="column"
      boxShadow="md"
      backgroundColor="white"
      color="black"
      padding="20px"
      rounded="md"
    >
      <Button position="absolute" top="0px" right="0px" onClick={onClose}>
        X
      </Button>
      <Text textAlign="center" fontWeight="bold" fontSize="32px">
        Almost there!
      </Text>
      <Text textAlign="center" marginTop="10px">
        At least one answer is not quite right.
      </Text>
      <Text textAlign="center">But I believe in you.</Text>
      <Button
        marginTop="28px"
        onClick={onClose}
        size="lg"
        fontSize="18px"
        rounded="md"
        paddingX="30px"
        background="black"
        color="white"
        fontWeight="semibold"
        boxShadow="xs"
      >
        Back to puzzle
      </Button>
    </Flex>
  )
}

export default PuzzleIncorrectModal
