import { useState } from 'react'
import { Button, ButtonToolbar, Form, Modal, Text } from 'rsuite'
import { useNavigate } from 'react-router-dom'
import privateAxios from '../../app/api/privateAxios'

const CreateTrip = () => {
  const [name, setName] = useState('First')
  const [location, setLocation] = useState('First')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [tripId, setTripId] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const res = await privateAxios.post('/trip', {
        name,
        location,
      })
      // const res = await axios({
      //   method: 'post',
      //   url: `${API_URL}/trip`,
      //   data: {
      //     name,
      //     location,
      //   },
      // })
      if (res.status === 200) {
        setIsModelOpen(true)
        setModalText(
          `New Trip created with name '${name}' and location '${location}'. Do you want to add photos and videos to this trip?`
        )
        setModalTitle('Trip Created')
        setTripId(res.data._id)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModelOpen(false)
  }

  const navigateNewTripPage = () => {
    navigate(`/trip/${tripId}`)
    handleCloseModal()
  }

  return (
    <>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Text>{modalText}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={navigateNewTripPage} appearance='primary'>
            Ok
          </Button>
          <Button onClick={handleCloseModal} appearance='subtle'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Form layout='horizontal' style={{ margin: '20px' }}>
        <Form.Group controlId='name-6'>
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name='name' value={name} onChange={setName} />
        </Form.Group>
        <Form.Group controlId='location-6'>
          <Form.ControlLabel>Location</Form.ControlLabel>
          <Form.Control
            name='location'
            value={location}
            onChange={setLocation}
          />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button
              appearance='primary'
              onClick={handleSubmit}
              loading={isLoading}
            >
              Create Trip
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </>
  )
}
export default CreateTrip
