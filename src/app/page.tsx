'use client'

import Footer from '@/sections/Footer'
import Header from '@/sections/Header'
import Puzzle from '@/sections/Puzzle'
import { Flex, useBreakpointValue } from '@chakra-ui/react'

export default function Home() {
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
      <Puzzle isMobile={isMobile} />
      {!isMobile && <Footer />}
    </Flex>
  )
}
