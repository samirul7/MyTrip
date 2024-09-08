import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav, Navbar } from 'rsuite'

const Navigation = () => {
  const [active, setActive] = useState('trip')
  const navigate = useNavigate()

  const setNavigate = (path) => {
    setActive(path)
    navigate(path)
    console.log(path)
  }
  return (
    <Navbar appearance='inverse'>
      <Navbar.Brand>MyTrip</Navbar.Brand>
      <Nav activeKey={active} onSelect={setNavigate}>
        <Nav.Item eventKey='trip/66dc6263081968cec1891bad'>TripInfo</Nav.Item>
        <Nav.Item eventKey='newTrip'>New Trip</Nav.Item>
      </Nav>
    </Navbar>
  )
}
export default Navigation
