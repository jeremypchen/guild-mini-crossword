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

  if (isMobile) {
    return <MobileHeader />
  }

  return (
    <Flex
      width="100%"
      paddingX="50px"
      paddingY="20px"
      borderColor="gray.300"
      borderBottom="1px"
      borderStyle="solid"
      direction="column"
    >
      <Flex justifyContent="space-between" color="black">
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
          fontWeight="semibold"
          background="#FED9DA"
          rounded="sm"
          paddingX="10px"
          size="sm"
        >
          Strike Fund
        </Button>
      </Flex>

      <Flex direction="column" width="450px" alignSelf="center" color="black">
        <Text
          marginTop="0px"
          color="black"
          fontSize="30px"
          className={crimson_pro.className}
          fontWeight="bold"
        >
          The Mini Crossword: Strike Edition
        </Text>

        <Flex width="100%" justifyContent="space-between" marginTop="6px">
          <Text fontSize="15px">By The NYT Tech Guild</Text>
          <Flex gap="4px">
            <Text fontSize="15px">Strike:</Text>
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

const MobileHeader = () => {
  return (
    <Flex
      width="100%"
      paddingY="14px"
      borderColor="gray.300"
      borderBottom="1px"
      borderStyle="solid"
      justifyContent="center"
    >
      <Flex gap="4px" color="black">
        <Text fontSize="18px">Strike:</Text>
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
  )
}

export default Header
