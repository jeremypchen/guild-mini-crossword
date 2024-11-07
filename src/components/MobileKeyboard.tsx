import { Flex, Text } from '@chakra-ui/react'
import { BsBackspace } from 'react-icons/bs'

const MobileKeyboard = ({
  onKeyPress,
}: {
  onKeyPress: (character: string) => void
}) => {
  return (
    <Flex paddingTop="4px" rowGap="4px" width="360px" direction="column">
      <Flex
        style={{
          gap: '3px',
          justifyContent: 'center',
        }}
      >
        <Key character="Q" onKeyPress={onKeyPress} />
        <Key character="W" onKeyPress={onKeyPress} />
        <Key character="E" onKeyPress={onKeyPress} />
        <Key character="R" onKeyPress={onKeyPress} />
        <Key character="T" onKeyPress={onKeyPress} />
        <Key character="Y" onKeyPress={onKeyPress} />
        <Key character="U" onKeyPress={onKeyPress} />
        <Key character="I" onKeyPress={onKeyPress} />
        <Key character="O" onKeyPress={onKeyPress} />
        <Key character="P" onKeyPress={onKeyPress} />
      </Flex>

      <Flex
        style={{
          gap: '3px',
          justifyContent: 'center',
        }}
      >
        <Key character="A" onKeyPress={onKeyPress} />
        <Key character="S" onKeyPress={onKeyPress} />
        <Key character="D" onKeyPress={onKeyPress} />
        <Key character="F" onKeyPress={onKeyPress} />
        <Key character="G" onKeyPress={onKeyPress} />
        <Key character="H" onKeyPress={onKeyPress} />
        <Key character="J" onKeyPress={onKeyPress} />
        <Key character="K" onKeyPress={onKeyPress} />
        <Key character="L" onKeyPress={onKeyPress} />
      </Flex>

      <Flex
        style={{
          gap: '5px',
          justifyContent: 'center',
        }}
      >
        <Key
          character="More"
          onKeyPress={() => {}}
          width="44px"
          fontSize={12}
        />
        <Key character="Z" onKeyPress={onKeyPress} />
        <Key character="X" onKeyPress={onKeyPress} />
        <Key character="C" onKeyPress={onKeyPress} />
        <Key character="V" onKeyPress={onKeyPress} />
        <Key character="B" onKeyPress={onKeyPress} />
        <Key character="N" onKeyPress={onKeyPress} />
        <Key character="M" onKeyPress={onKeyPress} />
        <BackspaceKey onKeyPress={onKeyPress} />
      </Flex>
    </Flex>
  )
}

const BackspaceKey = ({
  onKeyPress,
}: {
  onKeyPress: (character: string) => void
}) => {
  return (
    <Flex
      cursor="pointer"
      style={{
        backgroundColor: '#3b3b42',
        height: 50,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
      }}
      onClick={() => {
        onKeyPress('backspace')
      }}
    >
      <BsBackspace />
    </Flex>
  )
}

const Key = ({
  character,
  onKeyPress,
  width = '34px',
  fontSize = 20,
  marginLeft = 0,
  marginRight = 0,
}: {
  character: string
  onKeyPress: (character: string) => void
  width?: string
  fontSize?: number
  marginLeft?: number
  marginRight?: number
}) => {
  return (
    <Flex
      cursor="pointer"
      style={{
        backgroundColor: '#38383e',
        height: 50,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginLeft,
        marginRight,
      }}
      onClick={() => {
        onKeyPress(character)
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: '500',
          fontSize,
        }}
      >
        {character}
      </Text>
    </Flex>
  )
}

export default MobileKeyboard
