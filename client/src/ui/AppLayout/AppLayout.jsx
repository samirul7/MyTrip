import { Container, Content, Footer, Header } from 'rsuite'
import Navigation from '../../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <Container>
      <Header>
        <Navigation />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Container>
  )
}

export default AppLayout
