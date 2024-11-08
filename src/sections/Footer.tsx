'use client'

import { crimson_pro } from '@/app/fonts'
import { Flex, Text, useBreakpointValue, Image, Link } from '@chakra-ui/react'

const Footer = () => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  return (
    <Flex
      width="100%"
      backgroundColor="#1E1E1E"
      paddingX="36px"
      paddingTop="24px"
      marginTop={isMobile ? '20px' : '20px'}
      paddingBottom={isMobile ? '20px' : ''}
      height="100vh"
    >
      <Flex
        justifyContent="space-between"
        width="100%"
        direction={isMobile ? 'column' : 'row'}
      >
        <Flex direction="column">
          <Text
            className={crimson_pro.className}
            fontWeight="bold"
            fontSize="20px"
          >
            We are the tech workers of The New York Times.
          </Text>
          <Text fontSize="14px">
            We are on ULP strike for Just Cause, Fair Pay, and Return-to-Office
            (RTO) protections.{' '}
            <Link
              textDecor="underline"
              target="_blank"
              href="https://nytimesguild.org/tech"
            >
              Learn more
            </Link>
            .
          </Text>

          <Text fontSize="14px" marginTop="10px">
            Contribute to our{' '}
            <Link
              textDecor="underline"
              target="_blank"
              href="https://www.gofundme.com/f/nyt-tech-strike-fund"
            >
              strike fund
            </Link>
            .
          </Text>

          <Text
            fontSize="12px"
            marginTop="10px"
            position={isMobile ? '' : 'absolute'}
            bottom="10px"
          >
            © 2024 NYT Tech Guild
          </Text>
        </Flex>

        <Image
          src="/guild_icon.svg"
          boxSize="60px"
          marginTop={isMobile ? '20px' : ''}
          alt="NYT Tech Guild Logo"
        />
      </Flex>
    </Flex>
  )
}

export default Footer
