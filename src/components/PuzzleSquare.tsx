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

  let backgroundColor = '#595962' // default gray

  if (isClueLetterSelected || takeThePlungeHighlighted) {
    backgroundColor = '#5379a6' // blue
  } else if (isClueSelected) {
    backgroundColor = '#473f7c' // purple
  }
  //   else if (isHighlightedPartnerClueSelected) {
  //     backgroundColor = '#5c6c7f' // highlight blue
  //   }

  return (
    <Flex
      onClick={() => onSelectClueLetter(clueLetter)}
      style={{
        backgroundColor,
        height: 25,
        width: 25,
        alignItems: 'center',
        opacity: isPuzzleFinished && !takeThePlungeHighlighted ? 0.2 : 1,
      }}
    >
      {showClueNumber && (
        <Text
          style={{
            color: 'white',
            fontSize: 8,
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
          color: 'white',
          fontSize: 19,
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
