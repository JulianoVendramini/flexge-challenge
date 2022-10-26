import { Button } from 'antd'
import { useAuth } from '../../context/useAuth'

import * as S from './styles'

const Dashboard = () => {
  const { user, logOut } = useAuth()

  return (
    <S.Wrapper>
      <S.Title>Dashboard</S.Title>
      <S.Text>Welcome {user?.username}</S.Text>
      <S.ButtonWrapper>
        <Button type="ghost" size="large" onClick={logOut}>
          Log out
        </Button>
      </S.ButtonWrapper>
      <Button type="primary" size="large">
        <a href="/contracts">Go To Contracts</a>
      </Button>
    </S.Wrapper>
  )
}

export default Dashboard
