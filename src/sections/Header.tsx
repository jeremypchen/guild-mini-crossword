import { Flex, Text } from '@chakra-ui/react'

const Header = ({ isMobile }: { isMobile: boolean }) => {
  // Conditionally render the header based on isMobile

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
