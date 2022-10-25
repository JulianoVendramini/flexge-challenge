import styled from 'styled-components'
import { Form } from 'antd'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FormWrapper = styled(Form)`
  width: 50rem;
  background-color: ${({ theme }) => theme.colors.grey};
  padding: 4rem;
  border-radius: 1rem;
`
