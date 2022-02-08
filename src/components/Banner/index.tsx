import styled from 'styled-components'

const Wrapper = styled.div`
  background: ${({ theme }) => theme.primary3};
  box-shadow: ${({ theme }) => theme.boxShadow1};
  color: ${({ theme }) => theme.text1};
  border-radius: 10px;
  padding: 1.25rem;
`

export function Banner() {
  return (
    <Wrapper>
      You are on our legacy site. You can only close existing positions as these positions use our V1 contracts. If
      you&apos;d like to open new positions (using V2) please visit{' '}
      <a href="https://www.dsynths.com" style={{ color: 'red', textDecoration: 'none' }}>
        our new app.
      </a>
    </Wrapper>
  )
}
