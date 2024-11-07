import { PuzzleData, Clue, ClueLetter } from '@/types'

export const mapToCluesAndClueLetters = (puzzleData: PuzzleData) => {
  const acrossClues: Clue[] = []
  const downClues: Clue[] = []
  const clueLetters: ClueLetter[] = []
  const initialClueLetterMap: { [id: string]: ClueLetter } = {}

  for (const clue of puzzleData.data.across) {
    const acrossClue: Clue = {
      id: clue.id,
      clue: clue.clue,
      number: clue.number,
      direction: 'across',
      answer: clue.answer.split(''),
      answerAsString: clue.answer,
      input: [],
      inputAsString: '',
      originX: clue.originX,
      originY: clue.originY,
      endX: clue.endX,
      endY: clue.endY,
      clueLetters: [],
    }

    acrossClues.push(acrossClue)
  }

  for (const clue of puzzleData.data.down) {
    const downClue: Clue = {
      id: clue.id,
      clue: clue.clue,
      number: clue.number,
      direction: 'down',
      answer: clue.answer.split(''),
      answerAsString: clue.answer,
      input: [],
      inputAsString: '',
      originX: clue.originX,
      originY: clue.originY,
      endX: clue.endX,
      endY: clue.endY,
      clueLetters: [],
    }

    downClues.push(downClue)
  }

  for (const clue of acrossClues) {
    for (let i = 0; i < clue.answer.length; i++) {
      const associatedDownClue = downClues.find(
        (downClue) =>
          downClue.originX === clue.originX + i &&
          downClue.originY <= clue.originY &&
          clue.originY <= downClue.endY
      )

      if (!associatedDownClue) {
        throw new Error(
          `No associated down clue found for clue ${
            clue.number
          } at position ${i}. ${JSON.stringify(
            {
              answer: clue.answer,
              letter: clue.answer[i],
              x: clue.originX + i,
              yRange: [clue.originY, clue.endY],
            },
            null,
            2
          )}`
        )
      }

      const isFirstLetterInDownClueAnswer =
        clue.originY === associatedDownClue.originY

      const clueLetter: ClueLetter = {
        acrossClue: clue,
        downClue: associatedDownClue,
        id: `${clue.number}_${i + 1}`,
        number: isFirstLetterInDownClueAnswer
          ? associatedDownClue.number
          : clue.number,
        answer: clue.answer[i],
        input: null,
        indexInAcrossClueAnswer: i,
        isFirstLetterInDownClueAnswer,
        x: clue.originX + i,
        y: clue.originY,
      }

      clueLetters.push(clueLetter)
      clue.clueLetters.push(clueLetter)
      associatedDownClue.clueLetters.push(clueLetter)

      initialClueLetterMap[clueLetter.id] = clueLetter
    }
  }

  return {
    clues: [...acrossClues, ...downClues],
    acrossClues,
    downClues,
    clueLetters,
    initialClueLetterMap,
  }
}

export const timerSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

export const checkPuzzleCompletion = (clueLetters: ClueLetter[]) => {
  let isComplete = true
  let isCorrect = true

  if (!clueLetters.length)
    return {
      isComplete: false,
      isCorrect: false,
    }

  for (const clueLetter of clueLetters) {
    if (!clueLetter.input) {
      return {
        isComplete: false,
        isCorrect: false,
      }
    }
    if (clueLetter.input.toLowerCase() !== clueLetter.answer.toLowerCase()) {
      isCorrect = false
    }
  }

  return {
    isComplete,
    isCorrect,
  }
}
