import { SupportedChainId } from './chains'

export const ORACLE_BASE_URL_MAP = [new URL('https://oracle2.deus.finance'), new URL('https://oracle3.deus.finance')]

export const INFO_BASE_URL = new URL('https://oracle1.deus.finance')

export const ORACLE_NETWORK_NAMES: { [chainId: number]: string } = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.BSC]: 'bsc',
  [SupportedChainId.XDAI]: 'xdai',
  [SupportedChainId.HECO]: 'heco',
  [SupportedChainId.POLYGON]: 'polygon',
}
