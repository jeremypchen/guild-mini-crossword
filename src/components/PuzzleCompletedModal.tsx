import { Flex } from '@chakra-ui/react'

const PuzzleCompletedModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Flex
    // visible={visible}
    //    animationType="slide" transparent
    >
      <Flex
        onClick={onClose}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Flex
          style={{
            backgroundColor: '#181819',
            padding: 20,
          }}
        >
          You did it!
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PuzzleCompletedModal
