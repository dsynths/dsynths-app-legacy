import React from 'react'
import styled from 'styled-components'

import { Trade as TradeComponent } from 'components/App/Trade'
import { Banner } from 'components/Banner'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  overflow: visible;
  margin: 0 auto;
  margin-top: 75px;
  width: clamp(250px, 90%, 512px);

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 30px;
  `}
`

export default function Trade() {
  return (
    <Container>
      <Banner />
      <TradeComponent />
    </Container>
  )
}
