import { ClueLetter, Clue } from '@/types'
import { Flex, Text } from '@chakra-ui/react'

const PuzzleSquare = ({
  clueLetter,
  activeClue,
  activeClueLetter,
  onSelectClueLetter,
  isCircle = false,
  isPuzzleFinished,
}: {
  clueLetter: ClueLetter
  activeClue: Clue
  activeClueLetter: ClueLetter
  onSelectClueLetter: (clueLetter: ClueLetter) => void
  isCircle?: boolean
  isPuzzleFinished: boolean
}) => {
  const isClueLetterSelected = activeClueLetter.id === clueLetter.id
  const isClueSelected =
    activeClue.id === clueLetter.acrossClue?.id ||
    activeClue.id === clueLetter.downClue?.id
  //   const isHighlightedPartnerClueSelected =
  //     activeClue.highlightedPartnerClueId === clueLetter.acrossClue.id ||
  //     activeClue.highlightedPartnerClueId === clueLetter.downClue.id

  const showAcrossClueNumber = clueLetter.indexInAcrossClueAnswer === 0
  const showDownClueNumber = clueLetter.isFirstLetterInDownClueAnswer
  const showClueNumber =
    (showAcrossClueNumber || showDownClueNumber) && clueLetter.number !== 0

  const takeThePlungeHighlighted =
    isPuzzleFinished && clueLetter.acrossClue.number === 33

  let backgroundColor = '#FFF' // default gray

  if (isClueLetterSelected || takeThePlungeHighlighted) {
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
      opacity={isPuzzleFinished && !takeThePlungeHighlighted ? 0.2 : 1}
    >
      {showClueNumber && (
        <Text
          style={{
            color: 'black',
            fontSize: '12px',
            position: 'absolute',
            top: 0,
            left: 2,
            zIndex: 1,
          }}
        >
          {clueLetter.number}
        </Text>
      )}

      <Text
        style={{
          color: 'black',
          fontSize: '19px',
          position: 'absolute',
          top: 4,
        }}
      >
        {clueLetter.input}
        {/* {clueLetter.answer} */}
      </Text>
    </Flex>
  )
}

export default PuzzleSquare
