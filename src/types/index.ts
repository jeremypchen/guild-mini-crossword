export type Clue = {
  id: string
  number: number
  direction: 'across' | 'down'
  answer: string[]
  answerAsString: string
  input: string[]
  inputAsString: string
  originX: number
  originY: number
  endX: number
  endY: number
  clue: string
  clueLetters: ClueLetter[]
}

export type ClueLetter = {
  acrossClue: Clue
  downClue: Clue
  id: string
  number: number | null
  answer: string
  input: string | null
  indexInAcrossClueAnswer: number
  isFirstLetterInDownClueAnswer: boolean
  x: number
  y: number
}

export interface PuzzleData {
  metadata: {
    date: string
    id: string
  }
  data: {
    across: InputClue[]
    down: InputClue[]
  }
}

export interface InputClue {
  id: string
  number: number
  clue: string
  answer: string
  originX: number
  originY: number
  endX: number
  endY: number
}
