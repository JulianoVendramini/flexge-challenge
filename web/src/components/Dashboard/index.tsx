import { useAuth } from '../../context/useAuth'

import * as S from './styles'

const Dashboard = () => {
  const { user } = useAuth()

  return <S.Wrapper>hello {user?.username}</S.Wrapper>
}

export default Dashboard
