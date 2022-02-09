import { SupportedChainId } from 'constants/chains'
import useWeb3React from 'hooks/useWeb3'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: ${({ theme }) => theme.primary3};
  box-shadow: ${({ theme }) => theme.boxShadow1};
  color: ${({ theme }) => theme.text1};
  border-radius: 10px;
  padding: 1.25rem;
`

const XDAIWrapper = styled(Wrapper)`
  background: ${({ theme }) => theme.red3};
`

export function Banner() {
  return (
    <Wrapper>
      You are on our legacy site. You can only close existing positions as these positions use our V1 contracts. If
      you&apos;d like to open new positions (using V2) please visit{' '}
      <a href="https://www.dsynths.com" style={{ color: 'red', textDecoration: 'none' }}>
        our new app.
      </a>
      <br />
      <br />
      Be warned: this site will remain up until June 2022. If you haven't closed your positions by then, you may lose
      your money.
    </Wrapper>
  )
}

export function XDaiBanner() {
  const { chainId } = useWeb3React()

  return chainId === SupportedChainId.XDAI ? (
    <XDAIWrapper>
      Oh no! You are currently connected to xDAI chain, and this legacy version may experience issues with their RPC. If
      you're unable to close your position or not seeing your correct balances, please visit{' '}
      <a
        href="https://superlegacy.dsynths.com/exchange/basic?network=xdai"
        target="_blank"
        style={{ color: 'yellow', textDecoration: 'none' }}
      >
        our super legacy app.
      </a>
    </XDAIWrapper>
  ) : null
}
