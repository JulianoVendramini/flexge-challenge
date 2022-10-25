import { Form, Input as InputAntd, Divider as DividerAntd } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled(Form)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`

export const Input = styled(InputAntd)`
  width: 30rem;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

export const Title = styled.h3``

export const Divider = styled(DividerAntd)`
  margin: 0.6rem 0;
`

export const TableWrapper = styled(Form)``
