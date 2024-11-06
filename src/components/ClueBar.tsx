import React from 'react'
import { Clue } from '../types'
import { Flex, Text } from '@chakra-ui/react'
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

const ClueBar = ({
  onPreviousClue,
  onNextClue,
  onToggleDirection,
  clue,
}: {
  onPreviousClue: () => void
  onNextClue: () => void
  onToggleDirection: () => void
  clue: Clue
}) => {
  return (
    <Flex
      marginTop="10px"
      width="100%"
      alignItems="center"
      height="50px"
      backgroundColor="#FED9DA"
      justifyContent="space-between"
    >
      <Flex
        cursor="pointer"
        onClick={onPreviousClue}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: 44,
        }}
      >
        <CgChevronLeft color="black" />
      </Flex>

      <Flex
        onClick={() => onToggleDirection()}
        width="100%"
        maxWidth="300px"
        cursor="pointer"
        justifyContent="left"
      >
        <Text
          style={{
            color: 'black',
            fontSize: '13px',
          }}
        >
          {clue.clue}
        </Text>
      </Flex>

      <Flex
        onClick={onNextClue}
        cursor="pointer"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: 44,
        }}
      >
        <CgChevronRight color="black" />
      </Flex>
    </Flex>
  )
}

export default ClueBar
