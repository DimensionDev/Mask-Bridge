import { Flex, Grid, Image, Link, Text } from '@chakra-ui/react';
import RightArrowImage from 'assets/right-arrow.svg';
import formatDateTime from 'date-fns/format';
import { BigNumber, utils } from 'ethers';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { getExplorerUrl } from 'lib/helpers';
import React from 'react';

const { formatUnits } = utils;

const shortenHash = hash =>
  `${hash.slice(0, 6)}...${hash.slice(hash.length - 4, hash.length)}`;

const Tag = ({ bg, txt }) => (
  <Flex
    justify="center"
    align="center"
    bg={bg}
    borderRadius="6px"
    px="0.75rem"
    height="1.5rem"
    fontSize="xs"
    color="white"
    fontWeight="600"
    w="auto"
  >
    <Text>{txt}</Text>
  </Flex>
);

const networkTags = {
  1: <Tag bg="#5A74DA" txt="Ethereum" />,
  56: <Tag bg="#EEB00E" txt="BSC" />,
};

const getNetworkTag = chainId => networkTags[chainId];

export const HistoryItem = ({
  data: {
    chainId,
    timestamp,
    sendingTx,
    receivingTx: inputReceivingTx,
    amount,
    toToken,
    message,
    status,
  },
  handleClaimError,
}) => {
  const { getBridgeChainId } = useBridgeDirection();
  const bridgeChainId = getBridgeChainId(chainId);

  const timestampString = formatDateTime(
    new Date(parseInt(timestamp, 10) * 1000),
    'yyyy/MM/dd HH:mm:ss',
  );

  const receivingTx = inputReceivingTx;
  const pending = !inputReceivingTx || status === false;

  return (
    <Flex
      w="100%"
      background="white"
      boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
      borderRadius="1rem"
      fontSize="sm"
      p={4}
      mb={4}
    >
      <Grid
        templateColumns={{
          base: '1fr',
          md: '0.5fr 1.75fr 1fr 1fr 1.25fr 0.5fr',
          lg: '1fr 1.25fr 1fr 1fr 1.25fr 0.5fr',
        }}
        fontWeight="bold"
        w="100%"
      >
        <Flex
          align="center"
          justify="space-between"
          mb={{ base: 1, md: 0 }}
          px="2"
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Date
          </Text>
          <Text my="auto">{timestampString}</Text>
        </Flex>
        <Flex align="center" justify="space-between" mb={{ base: 1, md: 0 }}>
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Direction
          </Text>
          <Flex align="center">
            {getNetworkTag(chainId)}
            <Image src={RightArrowImage} mx="0.5rem" />
            {getNetworkTag(bridgeChainId)}
          </Flex>
        </Flex>
        <Flex
          align="center"
          justify={{ base: 'space-between', md: 'center' }}
          mb={{ base: 1, md: 0 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Sending Tx
          </Text>
          <Link
            color="blue.500"
            href={`${getExplorerUrl(chainId)}/tx/${sendingTx}`}
            title={sendingTx}
            rel="noreferrer noopener"
            target="_blank"
            my="auto"
            textAlign="center"
          >
            {shortenHash(sendingTx)}
          </Link>
        </Flex>
        <Flex
          align="center"
          justify={{ base: 'space-between', md: 'center' }}
          mb={{ base: 1, md: 0 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Receiving Tx
          </Text>
          {receivingTx ? (
            <Link
              color="blue.500"
              href={`${getExplorerUrl(bridgeChainId)}/tx/${receivingTx}`}
              rel="noreferrer noopener"
              target="_blank"
              my="auto"
              title={receivingTx}
              textAlign="center"
            >
              {shortenHash(receivingTx)}
            </Link>
          ) : (
            <Text />
          )}
        </Flex>
        <Flex
          align="center"
          justify={{ base: 'space-between', md: 'center' }}
          mb={{ base: 1, md: 0 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Amount
          </Text>
          <Flex>
            <Text my="auto" textAlign="center">
              {`${parseFloat(
                formatUnits(BigNumber.from(amount), toToken?.decimals),
              ).toFixed(4)} MASK`}
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" justify={{ base: 'center', md: 'flex-end' }}>
          <Text ml="0.25rem" color={pending ? '#FFA959' : '#45B36B'}>
            {pending ? 'Pending' : 'Success'}
          </Text>
        </Flex>
      </Grid>
    </Flex>
  );
};
