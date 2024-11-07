import { Flex, Text } from '@chakra-ui/react'

const Footer = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Flex
      width="100%"
      backgroundColor="black"
      padding="30px"
      position="absolute"
      bottom="0px"
    >
      <Text>We are the tech workers of The New York Times.</Text>
    </Flex>
  )
}

export default Footer
