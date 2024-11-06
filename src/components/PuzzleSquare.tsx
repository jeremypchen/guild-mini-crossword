import { ClueLetter, Clue } from '@/types'
import { Flex, Text } from '@chakra-ui/react'

const PuzzleSquare = ({
  clueLetter,
  activeClue,
  activeClueLetter,
  onSelectClueLetter,
}: {
  clueLetter: ClueLetter
  activeClue: Clue
  activeClueLetter: ClueLetter
  onSelectClueLetter: (clueLetter: ClueLetter) => void
}) => {
  const isClueLetterSelected = activeClueLetter.id === clueLetter.id
  const isClueSelected =
    activeClue.id === clueLetter.acrossClue?.id ||
    activeClue.id === clueLetter.downClue?.id

  const showAcrossClueNumber = clueLetter.indexInAcrossClueAnswer === 0
  const showDownClueNumber = clueLetter.isFirstLetterInDownClueAnswer
  const showClueNumber =
    (showAcrossClueNumber || showDownClueNumber) && clueLetter.number !== 0

  let backgroundColor = '#FFF' // default gray

  if (isClueLetterSelected) {
    backgroundColor = '#FD8E8F'
  } else if (isClueSelected) {
    backgroundColor = '#FED9DA'
  }

  return (
    <Flex
      position="relative"
      onClick={() => onSelectClueLetter(clueLetter)}
      borderColor="black"
      borderStyle="solid"
      borderWidth="0.5px"
      height="80px"
      width="80px"
      backgroundColor={backgroundColor}
      alignItems="center"
    >
      {showClueNumber && (
        <Text
          color="black"
          fontSize="14px"
          position="absolute"
          top="0px"
          left="2px"
          zIndex="1"
          userSelect="none"
        >
          {clueLetter.number}
        </Text>
      )}
      <Flex alignItems="center" justifyContent="center" width="100%">
        <Text color="black" fontSize="50px" userSelect="none">
          {clueLetter.input}
        </Text>
      </Flex>
    </Flex>
  )
}

export default PuzzleSquare
