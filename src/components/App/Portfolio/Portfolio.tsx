import React, { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled, { useTheme } from 'styled-components'
import BigNumber from 'bignumber.js'
import { Eye, EyeOff } from 'react-feather'

import useWeb3React from 'hooks/useWeb3'
import { useAssetByContract } from 'hooks/useAssetList'
import useCurrencyLogo from 'hooks/useCurrencyLogo'
import { Direction } from 'hooks/useTradePage'

import { useAppDispatch } from 'state'
import { Balance } from 'state/portfolio/reducer'
import { updatePrice, updateEquity } from 'state/portfolio/actions'
import { useActiveBalances, useShowEquity, useToggleEquity, useTotalEquity } from 'state/portfolio/hooks'
import { ConductedStatus, useConductedState } from 'state/conducted/reducer'
import { DetailsStatus, useDetailsState } from 'state/details/reducer'
import { useWalletModalToggle } from 'state/application/hooks'

import { formatDollarAmount } from 'utils/numbers'
import { SynchronizerChains } from 'constants/chains'

import ImageWithFallback from 'components/ImageWithFallback'
import { Loader } from 'components/Icons'
import { Card } from 'components/Card'
import { PrimaryButton } from 'components/Button'

const Wrapper = styled(Card)<{
  border?: boolean
}>`
  border: ${({ theme, border }) => (border ? `1px solid ${theme.border2}` : 'none')};
  padding: 1.25rem 0;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.75rem 0;
  `}
`

const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12.5px;
  padding: 0 1.25rem;

  & > * {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0 0.75rem;
  `}
`

const EquityWrapper = styled.div`
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.text2};
  }
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1.25rem;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.bg1};
  }

  & > * {
    &:last-child {
      margin-left: auto;
    }
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.5 0.75rem;
  `}
`

const RowContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const NameWrapper = styled.div<{
  long: boolean
}>`
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  align-items: center;
  & > * {
    &:first-child {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.text1};
      ${({ theme }) => theme.mediaWidth.upToMedium`
        font-size: 0.7rem;
      `}
    }
    &:nth-child(2) {
      font-size: 0.7rem;
      color: ${({ theme }) => theme.text2};
      ${({ theme }) => theme.mediaWidth.upToMedium`
        font-size: 0.6rem;
      `}
    }
    &:last-child {
      font-size: 0.5rem;
      color: white;
      padding: 0.1rem 0.2rem;
      border-radius: 3px;
      background: ${({ theme, long }) => (long ? theme.green1 : theme.red1)};
      ${({ theme }) => theme.mediaWidth.upToMedium`
        font-size: 0.4rem;
      `}
    }
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const PrimaryLabel = styled.div`
  font-size: 12.5px;
  color: ${({ theme }) => theme.text1};

  & > span {
    color: ${({ theme }) => theme.primary3};
    &:hover {
      cursor: pointer;
    }
  }
`

const SecondaryLabel = styled.div`
  font-size: 12.5px;
  color: ${({ theme }) => theme.text2};
`

const BalanceLabel = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.text2};
`

type sortableBalance = [string, Balance]
function sortBalances(a: sortableBalance, b: sortableBalance) {
  return parseFloat(a[1].equity) >= parseFloat(b[1].equity) ? -1 : 1
}

export default function Portfolio() {
  const { chainId, account } = useWeb3React()
  const theme = useTheme()
  const { status: conductedStatus } = useConductedState()
  const { status: detailsStatus } = useDetailsState()
  const toggleWalletModal = useWalletModalToggle()

  const balances = useActiveBalances()
  const contracts = useMemo(() => {
    const sorted = Object.entries(balances).sort(sortBalances)
    return sorted.map((list) => list[0])
  }, [balances])

  const toggleEquity = useToggleEquity()
  const showEquity = useShowEquity()

  const isLoading: boolean = useMemo(() => {
    return !(conductedStatus === ConductedStatus.OK && detailsStatus === DetailsStatus.OK)
  }, [conductedStatus, detailsStatus])

  const isSupportedChainId: boolean = useMemo(() => {
    if (!chainId || !account) return false
    return SynchronizerChains.includes(chainId)
  }, [chainId, account])

  const isWalletConnected: boolean = useMemo(() => {
    return !!account
  }, [account])

  const router = useRouter()
  const isSpiritTheme = useMemo(() => {
    return router.query?.theme === 'spirit'
  }, [router])

  function getStatusLabel(): JSX.Element | null {
    if (!isWalletConnected) {
      return (
        <>
          <PrimaryButton onClick={() => toggleWalletModal()}>Connect Wallet</PrimaryButton>
        </>
      )
    }

    if (!isSupportedChainId) {
      return <PrimaryLabel>Please connect to one of our supported networks.</PrimaryLabel>
    }

    if (isLoading) {
      return (
        <>
          <PrimaryLabel style={{ marginRight: '8px' }}>Loading assets</PrimaryLabel>
          <Loader size="12.5px" duration={'3s'} stroke={theme.text2} />
        </>
      )
    }

    if (!contracts.length) {
      return <PrimaryLabel>You don&apos;t own any synthetics.</PrimaryLabel>
    }
    return null
  }

  return (
    <Wrapper border={isSpiritTheme}>
      <HeaderContainer>
        <div>
          Positions
          <SecondaryLabel>{contracts.length}</SecondaryLabel>
        </div>
        <EquityWrapper onClick={toggleEquity}>
          Equity
          {showEquity ? <Eye size="12.5px" /> : <EyeOff size="12.5px" />}
        </EquityWrapper>
      </HeaderContainer>
      {getStatusLabel() ? (
        <LoadingContainer>{getStatusLabel()}</LoadingContainer>
      ) : (
        <>
          {contracts.map((contract, index) => (
            <AssetRow key={index} contract={contract} />
          ))}
        </>
      )}
    </Wrapper>
  )
}

function AssetRow({ contract }: { contract: string }) {
  // const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const asset = useAssetByContract(contract)
  const logo = useCurrencyLogo(asset?.id, asset?.symbol)
  const balances = useActiveBalances()
  const showEquity = useShowEquity()
  const totalEquity = useTotalEquity()

  const formattedBalance: string = useMemo(() => {
    const balance = balances[contract]['balance']
    return new BigNumber(balance).toPrecision(9, 1) // ROUND_DOWN
  }, [balances, contract])

  const equity: BigNumber = useMemo(() => {
    const { balance, price } = balances[contract]
    return new BigNumber(balance).times(price)
  }, [balances, contract])

  useEffect(() => {
    if (asset) {
      dispatch(updatePrice({ contract, price: asset.price }))
    }
  }, [dispatch, contract, asset])

  useEffect(() => {
    dispatch(updateEquity({ contract, equity: equity.toString() }))
  }, [dispatch, contract, equity])

  const equityLabel: string = useMemo(() => {
    if (!showEquity && !parseFloat(totalEquity)) {
      return '-- %'
    }
    return showEquity ? formatDollarAmount(equity.toNumber()) : `${equity.div(totalEquity).times(100).toFixed(2)}%`
  }, [equity, totalEquity, showEquity])

  const buildUrl = useCallback(
    (contract: string) => {
      const queryString = Object.keys(router.query)
        .map((key) => key + '=' + router.query[key])
        .join('&')
      return `/trade?assetId=${contract}&${queryString}`
    },
    [router]
  )

  return (
    <Link href={buildUrl(contract)} passHref>
      <Row>
        <ImageWithFallback src={logo} width={30} height={30} alt={`${asset?.symbol}`} round />
        <RowContent>
          <NameWrapper long={asset?.direction === Direction.LONG}>
            <div>{asset?.symbol}</div>
            <div>{asset?.name}</div>
            <div>{asset?.direction}</div>
          </NameWrapper>
          {showEquity && <BalanceLabel>{formattedBalance}</BalanceLabel>}
        </RowContent>
        <PrimaryLabel>{equityLabel}</PrimaryLabel>
      </Row>
    </Link>
  )
}
