import Footer from '@/sections/Footer'
import Header from '@/sections/Header'
import Puzzle from '@/sections/Puzzle'
import { PuzzleData } from '@/types'
import { Flex } from '@chakra-ui/react'

const Home = async () => {
  const puzzleData = await loadPuzzle()

  return (
    <Flex
      height="100vh"
      width="100%"
      direction="column"
      alignItems="center"
      background="white"
    >
      <Header />
      <Puzzle puzzleData={puzzleData} />
      <Footer />
    </Flex>
  )
}

const loadPuzzle = async (): Promise<PuzzleData> => {
  // TODO - load puzzle from somewherewith the closest date to today
  return require('../puzzles/sarah.json')
}

export default Home
