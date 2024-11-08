'use client'

import { crimson_pro } from '@/app/fonts'
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
      <Text className={crimson_pro.className} fontWeight="bold" fontSize="20px">
        We are the tech workers of The New York Times.
      </Text>
    </Flex>
  )
}

export default Footer
