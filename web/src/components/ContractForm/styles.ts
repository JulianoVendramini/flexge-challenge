import { Form, Input as InputAntd, Divider as DividerAntd } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.grey};
  padding: 4rem;
`

export const Wrapper = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`

export const Input = styled(InputAntd)`
  width: 28rem;
`

export const Divider = styled(DividerAntd)`
  margin: 0.6rem 0;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 2rem;
`

export const Title = styled.h1`
  font-size: 3rem;
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.darkBlue};
`
