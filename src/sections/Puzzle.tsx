import { mapToCluesAndClueLetters } from '@/app/utils'
import EmptyPuzzleSquare from '@/components/EmptyPuzzleSquare'
import PuzzleSquare from '@/components/PuzzleSquare'
import { PuzzleData, Clue, ClueLetter } from '@/types'
import { Flex } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

const Puzzle = ({ isMobile }: { isMobile: boolean }) => {
  const puzzleData: PuzzleData = require('../example_puzzle.json')
  const { acrossClues, downClues, initialClueLetterMap } = useMemo(() => {
    return mapToCluesAndClueLetters(puzzleData)
  }, [puzzleData])

  const [activeClue, setActiveClue] = useState<Clue>(acrossClues[0])
  const [activeClueLetterId, setActiveClueLetterId] = useState<string>(
    acrossClues[0].clueLetters[0].id
  )
  const [clueLetterMap, setClueLetterMap] = useState<{
    [id: string]: ClueLetter
  }>(initialClueLetterMap)

  const activeClueLetter = clueLetterMap[activeClueLetterId]
  const clueLetters = Object.values(clueLetterMap)
  const clueLettersGroupedByRow = clueLetters.reduce((acc, clueLetter) => {
    const row = acc[clueLetter.y] || []
    row.push(clueLetter)
    acc[clueLetter.y] = row
    return acc
  }, {} as Record<number, ClueLetter[]>)

  const onToggleDirection = (clueLetter: ClueLetter) => {}

  const isPuzzleFinished = false

  return <Flex color="black">Puzzle Here!</Flex>

  // return (
  //   <Flex width="100%" padding="20px">
  //     {Object.entries(clueLettersGroupedByRow).map(
  //       ([rowAsStr, clueLettersInRow]) => {
  //         let x = 1
  //         return (
  //           <Flex
  //             key={rowAsStr}
  //             style={{
  //               flexDirection: 'row',
  //               gap: 0.7,
  //               position: undefined,
  //             }}
  //           >
  //             {clueLettersInRow.map((clueLetter) => {
  //               if (clueLetter.x > x) {
  //                 const emptySquares = clueLetter.x - x
  //                 x = clueLetter.x + 1
  //                 return [
  //                   ...Array.from({ length: emptySquares }).map((_, i) => (
  //                     <EmptyPuzzleSquare
  //                       key={`empty-row:${rowAsStr}-${i}`}
  //                       isPuzzleFinished={isPuzzleFinished}
  //                     />
  //                   )),
  //                   <PuzzleSquare
  //                     key={clueLetter.id}
  //                     clueLetter={clueLetter}
  //                     activeClue={activeClue}
  //                     activeClueLetter={activeClueLetter}
  //                     onSelectClueLetter={() => onToggleDirection(clueLetter)}
  //                     isPuzzleFinished={isPuzzleFinished}
  //                   />,
  //                 ]
  //               } else {
  //                 x += 1
  //                 return (
  //                   <PuzzleSquare
  //                     key={clueLetter.id}
  //                     clueLetter={clueLetter}
  //                     activeClue={activeClue}
  //                     activeClueLetter={activeClueLetter}
  //                     onSelectClueLetter={() => onToggleDirection(clueLetter)}
  //                     isPuzzleFinished={isPuzzleFinished}
  //                   />
  //                 )
  //               }
  //             })}
  //           </Flex>
  //         )
  //       }
  //     )}
  //   </Flex>
  // )
}

export default Puzzle
