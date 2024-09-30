import {
  Container,
  Content,
  Form,
  Button,
  Panel,
  Stack,
  VStack,
  Divider,
  InputGroup,
  Input,
  Modal,
  Message,
} from 'rsuite'

import { Unvisible, Visible } from '@rsuite/icons'

import { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../../utils/helper'
import privateAxios from '../../../app/api/privateAxios'
import { setCredentials } from '../authSlice'
import { useDispatch } from 'react-redux'
import { setNameAndId } from '../userSlice'

const Password = forwardRef(function Password(props, ref) {
  const [visible, setVisible] = useState(false)
  const { value, onChange, ...rest } = props

  const handleChange = () => setVisible(!visible)

  return (
    <InputGroup inside ref={ref} {...rest}>
      <Input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
      />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <Visible /> : <Unvisible />}
      </InputGroup.Button>
    </InputGroup>
  )
})

const Login = () => {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('Temp@8923as')
  const [modal, setModal] = useState({
    isOpen: false,
    title: 'Error',
    message: '',
    type: 'error',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  const handleModalClose = () => {
    setModal({ isOpen: false })
  }

  const handleSubmit = async () => {
    if (validateEmail(email) === false)
      return setModal((modal) => ({
        ...modal,
        isOpen: true,
        message: 'Invalid Email.',
        type: 'error',
      }))

    if (validatePassword(password) === false)
      return setModal((modal) => ({
        ...modal,
        isOpen: true,
        message: 'Invalid Password.',
        type: 'error',
      }))

    try {
      const {
        data: { token, _id, name },
      } = await privateAxios.post('/auth', {
        email: email.trim(),
        password: password.trim(),
      })
      // console.log(accessToken, '    ', _id)
      dispatch(setCredentials({ token }))
      dispatch(setNameAndId({ _id, name }))
      // navigate('/')
    } catch (err) {
      console.log('check and debug', err)
    }
  }

  return (
    <>
      <Modal open={modal.isOpen} onClose={handleModalClose}>
        <Modal.Header>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Message type={modal.type}>{modal.message}</Message>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalClose} appearance='primary'>
            Ok
          </Button>
          <Button onClick={handleModalClose} appearance='subtle'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Content>
          <Stack
            alignItems='center'
            justifyContent='center'
            style={{ height: '100%' }}
          >
            <Panel header='Sign in' bordered style={{ width: 400 }}>
              <Form fluid onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.ControlLabel>Email address</Form.ControlLabel>
                  <Form.Control
                    name='email'
                    type='email'
                    value={email}
                    onChange={setEmail}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    name='password'
                    autoComplete='off'
                    accepter={Password}
                    value={password}
                    onChange={setPassword}
                  />
                </Form.Group>

                <VStack spacing={10}>
                  <Button appearance='primary' block type='submit'>
                    Sign in
                  </Button>
                  {/* <a href='#'>Forgot password?</a> */}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/signup')}
                  >
                    Don&apos;t have an account? Create one.
                  </a>
                </VStack>
              </Form>

              <Divider>OR</Divider>

              <Button
                // endIcon={<FaGithub />}
                block
                href='#'
              >
                Continue with Github
              </Button>
            </Panel>
          </Stack>
        </Content>
      </Container>
    </>
  )
}

export default Login
