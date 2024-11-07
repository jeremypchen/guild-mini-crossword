'use client'

import Footer from '@/sections/Footer'
import Header from '@/sections/Header'
import Puzzle from '@/sections/Puzzle'
import { PuzzleData } from '@/types'
import { Flex, useBreakpointValue } from '@chakra-ui/react'

export default function Home() {
  // TODO - load from somewhere
  const puzzleData: PuzzleData = require('../puzzles/sarah.json')

  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  return (
    <Flex
      height="100vh"
      width="100%"
      direction="column"
      alignItems="center"
      background="white"
    >
      <Header isMobile={isMobile} />
      <Puzzle isMobile={isMobile} puzzleData={puzzleData} />
      {!isMobile && <Footer />}
    </Flex>
  )
}
