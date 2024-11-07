'use client'

import { Flex, Text, useBreakpointValue } from '@chakra-ui/react'

const Footer = () => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  return (
    <Flex
      width="100%"
      backgroundColor="black"
      padding="30px"
      marginTop={isMobile ? '20px' : '40px'}
      height="100vh"
    >
      <Text>We are the tech workers of The New York Times.</Text>
    </Flex>
  )
}

export default Footer
