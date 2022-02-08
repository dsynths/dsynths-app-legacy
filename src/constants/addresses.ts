import { SupportedChainId } from './chains'

interface AddressMap {
  [chainId: number]: string
}

export const Multicall2: AddressMap = {
  [SupportedChainId.MAINNET]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [SupportedChainId.BSC]: '0xa9193376D09C7f31283C54e56D013fCF370Cd9D9',
  [SupportedChainId.XDAI]: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  [SupportedChainId.HECO]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [SupportedChainId.POLYGON]: '0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD',
}

export const Collateral: AddressMap = {
  [SupportedChainId.MAINNET]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3', // DEI
  [SupportedChainId.BSC]: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  [SupportedChainId.XDAI]: '0x0000000000000000000000000000000000000001', // xDAI
  [SupportedChainId.HECO]: '0x0298c2b32eae4da002a15f36fdf7615bea3da047', // HUSD
  [SupportedChainId.POLYGON]: '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3', // DEI
}

export const DefaultSynth: AddressMap = {
  [SupportedChainId.MAINNET]: '0xc9f982e8f89E1c6626746e93E0B238701892b2f8', // TSLA
  [SupportedChainId.BSC]: '0x0DA9E2D04b3A7F9C4424171Ee2EE23c88FaC2783', // TSLA
  [SupportedChainId.XDAI]: '0xC1664C5bE0dB8ABae249DCd23ec59E4D665656cB', // TSLA
  [SupportedChainId.HECO]: '0x6C503f804533C554a2dF47604D6630557b8bF1cA', // TSLA
  [SupportedChainId.POLYGON]: '0xF4849682B4D8C966a82d9Af3f5ec26B0E2A8Bb97', // TSLA
}

export const Synchronizer: AddressMap = {
  [SupportedChainId.MAINNET]: '0x7a27a7BF25d64FAa090404F94606c580ce8E1D37',
  [SupportedChainId.BSC]: '0x3b62f3820e0b035cc4ad602dece6d796bc325325',
  [SupportedChainId.XDAI]: '0x89951F2546f36789072c72C94272a68970Eba65e',
  [SupportedChainId.HECO]: '0xe82aa18b107aaf8D3829111C91CD0D133E0773DC',
  [SupportedChainId.POLYGON]: '0x5e16B021994e3c2536435CA3A45f0dA6536eD315',
}
