import { Button, Image } from '@chakra-ui/react'

const StrikeFundButton = ({ variant }: { variant: 'red' | 'white' }) => {
  return (
    <Button
      onClick={() =>
        window.open('https://www.gofundme.com/f/nyt-tech-strike-fund')
      }
      background={variant === 'red' ? '#FF4040' : '#FFF'}
      rounded="sm"
      width="80px"
      height="30px"
      paddingX="10px"
    >
      <Image
        src={`/gofundme_logo_${variant === 'red' ? 'white' : 'black'}.svg`}
        alt="GoFundMe Logo"
      />
    </Button>
  )
}

export default StrikeFundButton
