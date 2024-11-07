import { Flex } from '@chakra-ui/react'

const EmptyPuzzleSquare = ({
  isPuzzleFinished,
}: {
  isPuzzleFinished: boolean
}) => {
  return (
    <Flex
      height="70px"
      width="70px"
      backgroundColor="#171719"
      opacity={isPuzzleFinished ? 0.2 : 1}
      borderColor="black"
      borderStyle="solid"
      borderWidth="0.5px"
    />
  )
}

export default EmptyPuzzleSquare
