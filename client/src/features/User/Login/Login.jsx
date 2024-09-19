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
import { useLoginMutation } from '../userApiSlice'
import { validateEmail, validatePassword } from '../../../utils/helper'
import { setCredentials } from '../userSlice'
import { useDispatch, useSelector } from 'react-redux'

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
  const navigate = useNavigate()
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('Test@1234')
  const [modal, setModal] = useState({
    isOpen: false,
    title: 'Error',
    message: '',
    type: 'error',
  })

  const handleModalClose = () => {
    setModal({ isOpen: false })
  }

  const [login, { isError, isLoading, isSuccess }] = useLoginMutation()

  const dispatch = useDispatch()

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
      const { accessToken } = await login({
        email: email.trim(),
        password: password.trim(),
      }).unwrap()
      dispatch(setCredentials({ accessToken }))
      navigate('/')
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
