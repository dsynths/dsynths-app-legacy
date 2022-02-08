import { INFURA_KEY } from './keys'

export enum SupportedChainId {
  MAINNET = 1,
  BSC = 56,
  XDAI = 100,
  HECO = 128,
  POLYGON = 137,
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]

export const SynchronizerChains = [
  SupportedChainId.MAINNET,
  SupportedChainId.BSC,
  SupportedChainId.XDAI,
  SupportedChainId.HECO,
  SupportedChainId.POLYGON,
]

export const ProxyChains = [SupportedChainId.XDAI]

export const NETWORK_URLS = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.BSC]: 'https://bsc-dataseed1.binance.org',
  [SupportedChainId.XDAI]: 'https://rpc.xdaichain.com',
  [SupportedChainId.HECO]: 'https://http-mainnet.hecochain.com',
  [SupportedChainId.POLYGON]: 'https://polygon-rpc.com',
}
