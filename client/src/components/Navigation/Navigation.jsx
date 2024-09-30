import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, Nav, Navbar } from 'rsuite'

const Navigation = () => {
  const [active, setActive] = useState('trip')
  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.token)
  const userName = useSelector((state) => state.user.name)
  // const token = 'Hello'

  const setNavigate = (path) => {
    setActive(path)
    navigate(path)
    // console.log(path)
  }

  return (
    <Navbar appearance='inverse'>
      <Navbar.Brand>MyTrip</Navbar.Brand>
      {token && (
        <Nav activeKey={active} onSelect={setNavigate}>
          <Nav.Item eventKey='trip/66dc6263081968cec1891bad'>TripInfo</Nav.Item>
          <Nav.Item eventKey='trip/new'>New Trip</Nav.Item>
          <Nav.Item eventKey='searchTrip'>Search Trip</Nav.Item>
        </Nav>
      )}

      {token ? (
        <Nav pullRight>
          <Nav.Menu
            title={
              <span>
                <Avatar
                  circle
                  // src='https://i.pravatar.cc/150?u=1'
                  alt='User Avatar'
                  size='sm'
                />{' '}
                {userName.split(' ')[0]}
              </span>
            }
          >
            <Nav.Item eventKey='profile'>Profile</Nav.Item>
            <Nav.Item eventKey='logout'>Logout</Nav.Item>
          </Nav.Menu>
        </Nav>
      ) : (
        // <Nav.Menu title='About'>
        //   <Nav.Item eventKey='4'>Company</Nav.Item>
        //   <Nav.Item eventKey='5'>Team</Nav.Item>
        //   <Nav.Item eventKey='6'>Contact</Nav.Item>
        // </Nav.Menu>
        <Nav pullRight onSelect={setNavigate} activeKey={active}>
          <Nav.Item eventKey='login'>Login/Sign Up</Nav.Item>
        </Nav>
      )}
    </Navbar>
  )
}
export default Navigation
