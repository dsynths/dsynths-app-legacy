import { SupportedChainId } from './chains'

interface Info {
  chainId: string
  chainName: string
  label: string
  logoUrl: StaticImageData
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrl: string
  blockExplorerUrl: string
}

export const ChainInfo: { [chainId in SupportedChainId]: Info } = {
  [SupportedChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    label: 'Ethereum',
    logoUrl: require('/public/static/images/networks/mainnet.svg'),
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorerUrl: 'https://etherscan.io',
  },
  [SupportedChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    label: 'BSC',
    logoUrl: require('/public/static/images/networks/binance.svg'),
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    blockExplorerUrl: 'https://bscscan.com',
  },
  [SupportedChainId.XDAI]: {
    chainId: '0x64',
    chainName: 'xDAI Chain',
    label: 'xDAI',
    logoUrl: require('/public/static/images/networks/xdai.svg'),
    nativeCurrency: {
      name: 'xDAI',
      symbol: 'xDAI',
      decimals: 18,
    },
    rpcUrl: 'https://rpc.gnosischain.com',
    blockExplorerUrl: 'https://blockscout.com/poa/xdai',
  },
  [SupportedChainId.HECO]: {
    chainId: '0x80',
    chainName: 'Huobi ECO Chain Mainnet',
    label: 'HECO',
    logoUrl: require('/public/static/images/networks/heco.svg'),
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrl: 'https://http-mainnet.hecochain.com',
    blockExplorerUrl: 'https://hecoinfo.com',
  },
  [SupportedChainId.POLYGON]: {
    chainId: '0x89',
    chainName: 'Matic Mainnet',
    label: 'Polygon',
    logoUrl: require('/public/static/images/networks/polygon.svg'),
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'Matic',
      decimals: 18,
    },
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
  },
}
