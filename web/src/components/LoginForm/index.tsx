import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

import * as S from './styles'

const LoginForm = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const onFinish = async (values: any) => {
    const { username, password } = values

    try {
      await signIn(username, password)
    } catch (error) {
      message.error('username or password is incorrect')
    } finally {
      navigate('/')
    }
  }

  return (
    <S.Wrapper>
      <S.FormWrapper name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </S.FormWrapper>
    </S.Wrapper>
  )
}

export default LoginForm
