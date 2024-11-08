'use client'

import { checkPuzzleCompletion, mapToCluesAndClueLetters } from '@/app/utils'
import ClueBar from '@/components/ClueBar'
import EmptyPuzzleSquare from '@/components/EmptyPuzzleSquare'
import MobileKeyboard from '@/components/MobileKeyboard'
import PuzzleCompletedModal from '@/components/PuzzleCompletedModal'
import PuzzleIncorrectModal from '@/components/PuzzleIncorrectModal'
import PuzzleSquare from '@/components/PuzzleSquare'
import Timer from '@/components/Timer'
import { PuzzleData, Clue, ClueLetter } from '@/types'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

const Puzzle = ({ puzzleData }: { puzzleData: PuzzleData }) => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

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

  // add listener for keypress
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const character = e.key.toUpperCase()
      // needs to be a letter
      if (!/^[a-zA-Z]$/.test(character)) return
      onKeyPress(character)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        onKeyPress('backspace')
      } else if (e.key === 'Tab') {
        e.preventDefault()
        onNextClue()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeClueLetterId, activeClue, clueLetterMap])

  const { isComplete: isPuzzleFilledOut, isCorrect: isPuzzleCorrect } =
    useMemo(() => {
      return checkPuzzleCompletion(Object.values(clueLetterMap))
    }, [clueLetterMap])

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
        if (isPuzzleFilledOut || !clueLetterMap[clueLetter.id].input) {
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
        if (isPuzzleFilledOut || !clueLetterMap[clueLetter.id].input) {
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

  const onBackspace = () => {
    const currentClueLetterHasInput = clueLetterMap[activeClueLetterId].input
    const indexInClueAnswer = activeClue.clueLetters.findIndex(
      (clueLetter) => clueLetter.id === activeClueLetterId
    )

    setClueLetterMap((prev) => {
      return {
        ...prev,
        [activeClueLetterId]: {
          ...prev[activeClueLetterId],
          input: null,
        },
      }
    })

    if (currentClueLetterHasInput) {
      return
    }

    // if we didn't clear any input, clear the previous clue letter (if there is one), then go back one letter
    const previousClueLetter = activeClue.clueLetters[indexInClueAnswer - 1]
    if (previousClueLetter) {
      // clear and then go to it
      setClueLetterMap((prev) => {
        return {
          ...prev,
          [previousClueLetter.id]: {
            ...prev[previousClueLetter.id],
            input: null,
          },
        }
      })
      setActiveClueLetterId(previousClueLetter.id)
      return
    }

    // if no previous clue letter, go to the last clue letter of the previous clue
    // if there is input in that clue letter, clear it
    const currentClueId = activeClue.id
    let nextClue: Clue
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

    const lastClueLetter = nextClue.clueLetters[nextClue.clueLetters.length - 1]
    if (clueLetterMap[lastClueLetter.id].input) {
      setClueLetterMap((prev) => {
        return {
          ...prev,
          [lastClueLetter.id]: {
            ...prev[lastClueLetter.id],
            input: null,
          },
        }
      })
    }
    setActiveClue(nextClue)
    setActiveClueLetterId(lastClueLetter.id)
  }

  const onKeyPress = (character: string | null) => {
    if (character === 'backspace') {
      onBackspace()
      return
    }

    const currentClueLetterHasInput = clueLetterMap[activeClueLetterId].input
    setClueLetterMap((prev) => {
      return {
        ...prev,
        [activeClueLetterId]: {
          ...prev[activeClueLetterId],
          input: character,
        },
      }
    })

    const indexInClueAnswer = activeClue.clueLetters.findIndex(
      (clueLetter) => clueLetter.id === activeClueLetterId
    )

    // if replacing a letter, then just go to the next clue letter, if exists
    if (currentClueLetterHasInput) {
      const nextClueLetter = activeClue.clueLetters[indexInClueAnswer + 1]
      if (nextClueLetter) {
        setActiveClueLetterId(nextClueLetter.id)
        return
      }
    }

    // otherwise, go to the next empty clue letter
    for (const clueLetter of activeClue.clueLetters.slice(
      indexInClueAnswer + 1
    )) {
      if (!clueLetterMap[clueLetter.id].input) {
        setActiveClueLetterId(clueLetter.id)
        return
      }
    }

    // otherwise go to the next clue, and the first empty clue letter in that clue
    onNextClue()
  }

  const [showPuzzleIncorrectModal, setShowPuzzleIncorrectModal] =
    useState(false)
  const [showPuzzleCorrectModal, setShowPuzzleCorrectModal] = useState(false)

  useEffect(() => {
    if (isPuzzleFilledOut && isPuzzleCorrect) {
      setShowPuzzleCorrectModal(true)
    } else if (isPuzzleFilledOut && !isPuzzleCorrect) {
      setShowPuzzleIncorrectModal(true)
    }
  }, [isPuzzleFilledOut])

  const [timer, setTimer] = useState(0)

  return (
    <Flex
      direction="column"
      alignItems="center"
      paddingTop={isMobile ? '10px' : '20px'}
    >
      <Timer
        isMobile={isMobile}
        timer={timer}
        setTimer={setTimer}
        stopTimer={isPuzzleCorrect}
      />

      {showPuzzleIncorrectModal && (
        <PuzzleIncorrectModal
          onClose={() => setShowPuzzleIncorrectModal(false)}
        />
      )}

      {showPuzzleCorrectModal && (
        <PuzzleCompletedModal
          secondsToComplete={timer}
          onClose={() => setShowPuzzleCorrectModal(false)}
        />
      )}

      <Flex direction="column" border="5px solid black">
        {Object.entries(clueLettersGroupedByRow).map(
          ([rowAsStr, clueLettersInRow]) => {
            return (
              <Flex key={rowAsStr}>
                {[1, 2, 3, 4, 5].map((x) => {
                  const clueLetter = clueLettersInRow.find((clueLetter) => {
                    return x === clueLetter.x
                  })
                  return clueLetter ? (
                    <PuzzleSquare
                      key={clueLetter.id}
                      clueLetter={clueLetter}
                      activeClue={activeClue}
                      activeClueLetter={activeClueLetter}
                      onSelectClueLetter={() => onToggleDirection(clueLetter)}
                    />
                  ) : (
                    <EmptyPuzzleSquare key={`empty-row:${rowAsStr}-${x}`} />
                  )
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
        isMobile={isMobile}
      />

      {isMobile && <MobileKeyboard onKeyPress={onKeyPress} />}
    </Flex>
  )
}

export default Puzzle
