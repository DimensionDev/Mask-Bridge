import { Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react';
import { HistoryItem } from 'components/history/HistoryItem';
import { HistoryPagination } from 'components/history/HistoryPagination';
import { NoHistory } from 'components/history/NoHistory';
import { ClaimErrorModal } from 'components/modals/ClaimErrorModal';
import { LoadingModal } from 'components/modals/LoadingModal';
import { AuspiciousGasWarning } from 'components/warnings/AuspiciousGasWarning';
import { GraphHealthWarning } from 'components/warnings/GraphHealthWarning';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useUserHistory } from 'hooks/useUserHistory';
import {
  getGasPrice,
  getLowestHistoricalEthGasPrice,
  getMedianHistoricalEthGasPrice,
} from 'lib/gasPrice';
import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';

const TOTAL_PER_PAGE = 20;

export const BridgeHistory = ({ page }) => {
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  const [claimErrorShow, setClaimErrorShow] = useState(false);
  const [claimErrorToken, setClaimErrorToken] = useState(null);
  const { foreignChainId } = useBridgeDirection();

  const { transfers, loading } = useUserHistory();

  const handleClaimError = useCallback(toToken => {
    toToken && setClaimErrorToken(toToken);
    setClaimErrorShow(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setClaimErrorShow(false);
    claimErrorToken && setClaimErrorToken(null);
  }, [claimErrorToken]);

  if (loading) {
    return (
      <Flex w="100%" maxW="75rem" direction="column" mt={8} px={8}>
        <LoadingModal />
      </Flex>
    );
  }

  const filteredTransfers = transfers;

  const numPages = Math.ceil(filteredTransfers.length / TOTAL_PER_PAGE);
  const displayHistory = filteredTransfers.slice(
    (page - 1) * TOTAL_PER_PAGE,
    Math.min(page * TOTAL_PER_PAGE, filteredTransfers.length),
  );

  if (numPages > 1 && page > numPages) {
    return <Redirect to="/history" />;
  }

  const currentGasPrice = getGasPrice();
  const medianGasPrice = getMedianHistoricalEthGasPrice();
  const lowestGasPrice = getLowestHistoricalEthGasPrice();

  return (
    <Flex
      minW={smallScreen ? '20rem' : '60rem'}
      maxW="75rem"
      direction="column"
      mt={8}
      px={{ base: 4, sm: 8 }}
      w="100%"
    >
      <ClaimErrorModal
        claimErrorShow={claimErrorShow}
        claimErrorToken={claimErrorToken}
        onClose={handleModalClose}
      />
      {foreignChainId === 1 && medianGasPrice.gt(currentGasPrice) && (
        <AuspiciousGasWarning
          currentPrice={currentGasPrice}
          medianPrice={medianGasPrice}
          lowestPrice={lowestGasPrice}
        />
      )}
      <GraphHealthWarning />
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          History
        </Text>
      </Flex>

      {displayHistory.length > 0 ? (
        <>
          <Grid
            templateColumns={{
              base: '1fr',
              md: '0.5fr 1.75fr 1fr 1fr 1.25fr 0.5fr',
              lg: '1fr 1.25fr 1fr 1fr 1.25fr 0.5fr',
            }}
            color="grey"
            fontSize="sm"
            px={4}
            mb={4}
            display={{ base: 'none', md: 'grid' }}
          >
            <Text>Date</Text>
            <Text>Direction</Text>
            <Text textAlign="center">Sending Tx</Text>
            <Text textAlign="center">Receiving Tx</Text>
            <Text textAlign="center">Amount</Text>
            <Text textAlign="right">Status</Text>
          </Grid>
          {displayHistory.map(item => (
            <HistoryItem
              key={item.sendingTx}
              data={item}
              handleClaimError={handleClaimError}
            />
          ))}
          {numPages > 1 && (
            <HistoryPagination numPages={numPages} currentPage={page} />
          )}
        </>
      ) : (
        <NoHistory />
      )}
    </Flex>
  );
};
