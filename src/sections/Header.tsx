'use client'
import { crimson_pro } from '@/app/fonts'
import { daysSinceStrike } from '@/app/utils'
import StrikeFundButton from '@/components/StrikeFundButton'
import { Badge, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

const Header = () => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  if (isMobile) {
    return <Flex paddingTop="20px"></Flex>
    // return <MobileHeader />
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

        {/* <Flex alignItems="center" gap="6px">
          <Text fontSize="14px">Support the NYT Tech Guild</Text>
          <StrikeFundButton variant="red" />
        </Flex> */}
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

        <Flex width="100%" justifyContent="center" marginTop="6px">
          <Text fontSize="15px">By The NYT Tech Guild</Text>
          {/* <Flex gap="4px">
            <Text fontSize="15px">Strike:</Text>
            <DaysOnStrikeBadge />
          </Flex> */}
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
        <DaysOnStrikeBadge />
      </Flex>
    </Flex>
  )
}

const DaysOnStrikeBadge = () => {
  return (
    <Badge
      background="white"
      border="1px solid red"
      paddingY="3px"
      paddingX="6px"
      color="red"
      fontWeight="bold"
      fontSize="15px"
    >
      DAY {daysSinceStrike()}
    </Badge>
  )
}

export default Header
