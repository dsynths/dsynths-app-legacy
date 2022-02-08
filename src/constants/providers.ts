import { JsonRpcProvider } from '@ethersproject/providers'

import { NETWORK_URLS, SupportedChainId } from './chains'

export const Providers = {
  [SupportedChainId.MAINNET]: new JsonRpcProvider(NETWORK_URLS[SupportedChainId.MAINNET]),
  [SupportedChainId.BSC]: new JsonRpcProvider(NETWORK_URLS[SupportedChainId.BSC]),
  [SupportedChainId.XDAI]: new JsonRpcProvider(NETWORK_URLS[SupportedChainId.XDAI]),
  [SupportedChainId.HECO]: new JsonRpcProvider(NETWORK_URLS[SupportedChainId.HECO]),
  [SupportedChainId.POLYGON]: new JsonRpcProvider(NETWORK_URLS[SupportedChainId.POLYGON]),
}
