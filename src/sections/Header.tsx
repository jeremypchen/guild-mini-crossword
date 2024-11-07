'use client'

import { Flex, Text, useBreakpointValue } from '@chakra-ui/react'

const Header = () => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  return (
    <Flex
      width="100%"
      padding="50px"
      borderColor="gray.300"
      borderBottom="1px"
      borderStyle="solid"
    >
      <Text color="black" fontSize="30px">
        The Mini Crossword: Strike Edition {isMobile ? 'Mobile' : 'Desktop'}
      </Text>
    </Flex>
  )
}

export default Header
