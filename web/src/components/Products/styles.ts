import styled from 'styled-components'
import { Form, Input as InputAntd } from 'antd'

export const Wrapper = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`

export const Input = styled(InputAntd)`
  width: 28rem;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

export const Title = styled.h3``
