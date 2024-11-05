import { Flex } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex width="100vh" direction="column" alignItems="center">
      <h1>Guild Mini Crossword</h1>
      <CrosswordPuzzle />
    </Flex>
  )
}

const CrosswordPuzzle = () => {
  return <Flex>Puzzle goes here!</Flex>
}
