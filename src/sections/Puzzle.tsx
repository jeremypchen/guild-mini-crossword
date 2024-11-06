import { mapToCluesAndClueLetters } from '@/app/utils'
import ClueBar from '@/components/ClueBar'
import EmptyPuzzleSquare from '@/components/EmptyPuzzleSquare'
import PuzzleSquare from '@/components/PuzzleSquare'
import { PuzzleData, Clue, ClueLetter } from '@/types'
import { Flex, Text } from '@chakra-ui/react'
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

  const isPuzzleFinished = false
  let activeDirection = activeClue.direction

  const onToggleDirection = (clueLetter?: ClueLetter) => {
    if (clueLetter) {
      // if it's the same clue letter as the currently active one, then toggle to the opposite direction clue
      if (clueLetter.id === activeClueLetterId) {
        if (activeDirection === 'across') {
          setActiveClue(clueLetter.downClue)
        } else {
          setActiveClue(clueLetter.acrossClue)
        }

        return
      }

      // otherwise, set the active clue letter
      setActiveClueLetterId(clueLetter.id)
      // set the new clue, using the direction of the current active clue
      setActiveClue(
        activeDirection === 'across'
          ? clueLetter.acrossClue
          : clueLetter.downClue
      )
    } else {
      // otherwise, set the new clue, using the direction of the current active clue
      const activeClueLetter = clueLetterMap[activeClueLetterId]
      setActiveClue(
        activeDirection === 'across'
          ? activeClueLetter.downClue
          : activeClueLetter.acrossClue
      )
    }
  }

  const onNextClue = () => {
    let nextClue: Clue
    let currentClueId = activeClue.id

    while (true) {
      if (activeDirection === 'across') {
        const nextClueIndex = acrossClues.findIndex(
          (clue) => clue.id === currentClueId
        )
        nextClue = acrossClues[nextClueIndex + 1]
        if (!nextClue) {
          nextClue = downClues[0]
        }
      } else {
        const nextClueIndex = downClues.findIndex(
          (clue) => clue.id === currentClueId
        )
        nextClue = downClues[nextClueIndex + 1]
        if (!nextClue) {
          nextClue = acrossClues[0]
        }
      }

      if (!nextClue) throw new Error('No next clue found')

      // if next clue has no empty clue letters, then go to the next clue
      for (const clueLetter of nextClue.clueLetters) {
        if (isPuzzleFinished || !clueLetterMap[clueLetter.id].input) {
          setActiveClue(nextClue)
          setActiveClueLetterId(clueLetter.id)
          return
        }
      }

      // otherwise, go to the next clue
      currentClueId = nextClue.id
      activeDirection = nextClue.direction
    }
  }

  const onPreviousClue = () => {
    let nextClue
    let currentClueId = activeClue.id

    while (true) {
      if (activeDirection === 'across') {
        const nextClueIndex = acrossClues.findIndex(
          (clue) => clue.id === currentClueId
        )
        nextClue = acrossClues[nextClueIndex - 1]
        if (!nextClue) {
          nextClue = downClues[downClues.length - 1]
        }
      } else {
        const nextClueIndex = downClues.findIndex(
          (clue) => clue.id === currentClueId
        )
        nextClue = downClues[nextClueIndex - 1]
        if (!nextClue) {
          nextClue = acrossClues[acrossClues.length - 1]
        }
      }

      if (!nextClue) throw new Error('No next clue found')

      // if next clue has no empty clue letters, then go to the next clue
      for (const clueLetter of nextClue.clueLetters) {
        if (isPuzzleFinished || !clueLetterMap[clueLetter.id].input) {
          setActiveClue(nextClue)
          setActiveClueLetterId(clueLetter.id)
          return
        }
      }

      // otherwise, go to the next clue
      currentClueId = nextClue.id
      activeDirection = nextClue.direction
    }
  }

  return (
    <Flex direction="column" alignItems="center" paddingTop="30px">
      <Text color="black" marginBottom="30px">
        Timer
      </Text>

      <Flex
        // width={isMobile ? '100%' : '50%'}
        direction="column"
        borderColor="black"
        borderStyle="solid"
        borderWidth="5px"
      >
        {Object.entries(clueLettersGroupedByRow).map(
          ([rowAsStr, clueLettersInRow]) => {
            let x = 1
            return (
              <Flex key={rowAsStr} direction="row">
                {clueLettersInRow.map((clueLetter) => {
                  if (clueLetter.x > x) {
                    const emptyPrependSquares = clueLetter.x - x

                    x = clueLetter.x + 1
                    return [
                      ...Array.from({ length: emptyPrependSquares }).map(
                        (_, i) => (
                          <EmptyPuzzleSquare
                            key={`empty-row:${rowAsStr}-${i}`}
                            isPuzzleFinished={isPuzzleFinished}
                          />
                        )
                      ),
                      <PuzzleSquare
                        key={clueLetter.id}
                        clueLetter={clueLetter}
                        activeClue={activeClue}
                        activeClueLetter={activeClueLetter}
                        onSelectClueLetter={() => onToggleDirection(clueLetter)}
                        isPuzzleFinished={isPuzzleFinished}
                      />,
                    ]
                  } else {
                    x += 1
                    return (
                      <PuzzleSquare
                        key={clueLetter.id}
                        clueLetter={clueLetter}
                        activeClue={activeClue}
                        activeClueLetter={activeClueLetter}
                        onSelectClueLetter={() => onToggleDirection(clueLetter)}
                        isPuzzleFinished={isPuzzleFinished}
                      />
                    )
                  }
                })}
              </Flex>
            )
          }
        )}
      </Flex>

      <ClueBar
        onPreviousClue={onPreviousClue}
        onNextClue={onNextClue}
        onToggleDirection={onToggleDirection}
        clue={activeClue}
      />
    </Flex>
  )
}

export default Puzzle
