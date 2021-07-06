import { networks } from 'lib/networks';

import { useBridgeDirection } from './useBridgeDirection';

export const useTotalConfirms = () => {
  const { bridgeDirection } = useBridgeDirection();
  const network = networks[bridgeDirection];
  return network.confirmations;
};
