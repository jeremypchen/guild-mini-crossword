'use client'
import { crimson_pro } from '@/app/fonts'
import { daysSinceStrike } from '@/app/utils'
import { Badge, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

const Header = () => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  return (
    <Flex
      width="100%"
      paddingX="50px"
      paddingY="20px"
      borderColor="gray.300"
      borderBottom="1px"
      borderStyle="solid"
      direction="column"
      color="black"
    >
      <Flex justifyContent="space-between">
        <Flex gap="16px" fontSize="14px">
          <Flex direction="column">
            <Text fontWeight="bold" borderBottom="4px solid black">
              Today
            </Text>
          </Flex>
          {/* <Flex direction="column">
            <Text>Mini Archive</Text>
          </Flex> */}
          <Text
            cursor="pointer"
            onClick={() =>
              window.open(
                'https://nytimesguild.org/tech/guild-builds/index.html'
              )
            }
          >
            More Games
          </Text>
        </Flex>

        <Button
          onClick={() =>
            window.open('https://www.gofundme.com/f/nyt-tech-strike-fund')
          }
        >
          Strike Fund
        </Button>
      </Flex>

      <Flex direction="column">
        <Text
          marginTop="20px"
          color="black"
          fontSize="30px"
          className={crimson_pro.className}
          fontWeight="bold"
        >
          The Mini Crossword: Strike Edition
        </Text>

        <Flex width="100%" justifyContent="space-between" marginTop="10px">
          <Text>By The NYT Tech Guild</Text>
          <Flex gap="4px">
            <Text>Strike:</Text>
            <Badge
              background="red"
              paddingY="4px"
              paddingX="6px"
              color="white"
              fontWeight="bold"
              fontSize="16px"
            >
              DAY {daysSinceStrike()}
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
