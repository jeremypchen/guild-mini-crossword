import { Flex } from '@chakra-ui/react'

const EmptyPuzzleSquare = ({
  isPuzzleFinished,
}: {
  isPuzzleFinished: boolean
}) => {
  return (
    <Flex
      style={{
        height: 25,
        width: 25,
        backgroundColor: '#171719',
        opacity: isPuzzleFinished ? 0.2 : 1,
      }}
    />
  )
}

export default EmptyPuzzleSquare
