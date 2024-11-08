import React, { useState, useEffect } from 'react'
import { crimson_pro } from '@/app/fonts'
import { daysSinceStrike, timerSecondsToMinutes } from '@/app/utils'
import { Button, Flex, useBreakpointValue, Image, Text, Link } from '@chakra-ui/react'
import { IoShareSocialOutline } from 'react-icons/io5'
import * as htmlToImage from 'html-to-image';

const ID = 'guild-share';

const PIXEL_RATIO = 4;
const DEFAULT_IMG_OPTIONS = {
  cacheBust: true,
  pixelRatio: PIXEL_RATIO
};

const PuzzleCompletedModal = ({
  secondsToComplete,
  onClose,
}: {
  secondsToComplete: number
  onClose: () => void
}) => {
  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) || false

  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare('canShare' in navigator);
  }, []);

  function filter(node: HTMLElement) {
    const isNode = 'closest' in node;
    if (!isNode) {
      return true;
    }

    if (node.closest('#share-button')) {
      return false;
    }

    return true;
  }

  const onShareUrl = async (event: MouseEvent) => {
    const url = 'https://mini.toomuchdog.com/';
    navigator.clipboard.writeText(url);
    const target = event.target as HTMLElement;

    const realInner = target.querySelector('span') || target;
		const origText = realInner.textContent;
		target.textContent = 'Link Copied!';
    setTimeout(() => {
      target.textContent = origText;
    }, 2000);
    
  };

  const shareOrDownload = async (blob1: Blob) => {
    const fileName = 'guild-mini.png';

    if (canShare) {
      const data = {
        files: [
          new File([blob1], fileName, {
            type: 'image/png',
            lastModified: new Date().getTime()
          })
        ]
      };      
      try {
        await navigator.share(data);
      } catch (err) {
        console.error('err');
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error(err.name, err.message);
        }
      }
    } else {
      // Fallback implementation, download the file
      const a = document.createElement('a');
      a.download = fileName;
      a.style.display = 'none';
      a.href = URL.createObjectURL(blob1);
      a.addEventListener('click', () => {
        setTimeout(() => {
          URL.revokeObjectURL(a.href);
          a.remove();
        }, 1000);
      });
      document.body.append(a);
      a.click();
    }
  };

	const onShare = async (event: MouseEvent) => {
		const target = event.target as HTMLElement;
    const realInner = target.querySelector('span') || target;
		const origText = realInner.textContent;
		target.textContent = origText == 'Share' ? 'Sharing...' : 'Loading...';


		const poster = document.getElementById(ID);
		const options = {
			...DEFAULT_IMG_OPTIONS,
      backgroundColor: '#FED9DA',
			pixelRatio: PIXEL_RATIO,
      filter: filter,
      canvasWidth: 900,
      canvasHeight: 1600,
		};
    if (!poster) {
      return;
    }

		await htmlToImage.toBlob(poster, options);
		// this is lame-o but we have to wait for safari. sigh
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const blob = await htmlToImage.toBlob(poster, options);
    if (!blob) {
      return;
    }

		await shareOrDownload(blob);
		target.textContent = origText;
	};

  return (
    <Flex
      zIndex={2}
      position="absolute"
      top={isMobile ? '50px' : '100px'}
      width={isMobile ? '360px' : '600px'}
      backgroundColor="#FED9DA"
      boxShadow="xs"
      rounded="md"
      direction="column"
    >
      <Flex id={ID} direction="column" paddingY="50px" paddingX={isMobile ? '20px' : '50px'}>
      <Button
        position="absolute"
        top="0px" 
        right="0px"
        onClick={onClose}
        background="transparent"
        aria-label="Close modal"
      >
        X
      </Button>

      <Image src="/guild_icon_2.svg" width="60px" alt="NYT Tech Guild Logo" />
      <Text
        fontSize="40px"
        color="black"
        fontWeight="bold"
        marginTop="10px"
        className={crimson_pro.className}
      >
        You did it!
      </Text>
      <Text color="black">
        You supported the Times Tech Guild by playing the Tech Guild&apos;s
        Strike edition of the Mini.
      </Text>

      <Flex
        marginTop="40px"
        borderTop="1px solid #1E1E1E"
        borderBottom="1px solid #1E1E1E"
        justifyContent="space-between"
        paddingY="10px"
        paddingX={isMobile ? '' : '40px'}
      >
        <Flex direction="column" alignItems="center">
          <Text fontSize="36px" color="#B42E2F" fontWeight="bold">
            {timerSecondsToMinutes(secondsToComplete)}
          </Text>
          <Text textAlign="center" color="black">
            Time to <br />
            complete
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text fontSize="36px" color="#B42E2F" fontWeight="bold">
            {daysSinceStrike()}
          </Text>
          <Text textAlign="center" color="black">
            Days <br />
            on strike
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text fontSize="36px" color="#B42E2F" fontWeight="bold">
            {daysSinceNegotiation()}
          </Text>
          <Text textAlign="center" color="black">
            Days negotiating <br />a fair contract
          </Text>
        </Flex>
      </Flex>

      <Flex direction="row" justifyContent="space-between" id="share-button">
        <Button alignSelf="flex-start" background="transparent" color="black" onClick={onShare}>
          <Flex gap="4px" fontWeight="semibold">
            <span>Share image</span>
            <IoShareSocialOutline />
          </Flex>
        </Button>

        <Button alignSelf="flex-end" background="transparent" color="black" onClick={onShareUrl}>
          <Flex gap="4px" fontWeight="semibold">
            <span>Share Link</span>
            <IoShareSocialOutline />
          </Flex>
        </Button>
      </Flex>

      <Link
        marginTop="40px"
        color="white"
        backgroundColor="#B42F2F"
        fontWeight="bold"
        fontSize={isMobile ? '16px' : '22px'}
        paddingY="30px"
        rounded="xs"
        textAlign="center"
        display="block"
        href="https://nytimesguild.org/tech/guild-builds/index.html"
      >
        New games, every day while we strike.
      </Link>

      <Text
        alignSelf="center"
        color="black"
        marginTop="14px"
        fontSize={isMobile ? '14px' : '18px'}
      >
        By the NYT Tech Guild
      </Text>
      </Flex>
    </Flex>
  )
}

const daysSinceNegotiation = () => {
  const strikeDate = new Date('2022-07-27')
  const currentDate = new Date()
  const timeDiff = Math.abs(currentDate.getTime() - strikeDate.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}

export default PuzzleCompletedModal
