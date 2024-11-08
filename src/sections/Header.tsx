'use client'
import { crimson_pro } from '@/app/fonts'
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
      <Text
        color="black"
        fontSize="30px"
        className={crimson_pro.className}
        fontWeight="bold"
      >
        The Mini Crossword: Strike Edition
      </Text>
    </Flex>
  )
}

export default Header
