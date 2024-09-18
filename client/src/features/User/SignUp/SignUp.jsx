import {
  Container,
  Content,
  Form,
  Button,
  Panel,
  Stack,
  VStack,
  InputGroup,
  Input,
  Modal,
  Message,
  List,
} from 'rsuite'

import { Unvisible, Visible } from '@rsuite/icons'

import { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../../utils/helper'
import axios from 'axios'
import { API_URL } from '../../../services/apiTrip'

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

const SignUp = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('Samirul')
  const [nameErrorMessage, setNameErrorMessage] = useState('')

  const [email, setEmail] = useState('test@test.com')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [password, setPassword] = useState('Test@1234')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [rePassword, setRePassword] = useState('Test@1234')
  const [rePasswordErrorMessage, setRePasswordErrorMessage] = useState('')
  const [isRePasswordEnabled, setIsRePasswordEnabled] = useState(false)

  const [modal, setModal] = useState({
    isOpen: false,
    title: 'Error',
    message: '',
    type: 'error',
  })

  const [isPasswordPolicyModalOpen, setIsPasswordPolicyModalOpen] =
    useState(false)

  const handleChange = (name, value) => {
    if (name === 'name') {
      if (value === '') setNameErrorMessage("Full Name can't be empty.")
      else if (nameErrorMessage !== '') setNameErrorMessage('')
      return setName(value)
    }

    if (name === 'email') {
      if (value === '') setEmailErrorMessage("Email can't be empty.")
      else if (validateEmail(value)) {
        if (emailErrorMessage !== '') setEmailErrorMessage('')
      } else setEmailErrorMessage('Invalid Email')
      return setEmail(value)
    }

    if (name === 'password') {
      setIsRePasswordEnabled(false)
      if (value === '') setPasswordErrorMessage("Password can't be empty.")
      else if (validatePassword(value)) {
        if (passwordErrorMessage !== '') setPasswordErrorMessage('')
        setIsRePasswordEnabled(true)
      } else setPasswordErrorMessage('Invalid password')
      return setPassword(value)
    }

    if (name === 'rePassword') {
      if (value === '') setRePasswordErrorMessage("Password can't be empty.")
      else if (validatePassword(value)) {
        if (rePasswordErrorMessage !== '') setRePasswordErrorMessage('')
      } else setRePasswordErrorMessage('Invalid password')
      return setRePassword(value)
    }
  }

  const handleModalClose = () => {
    setModal({ isOpen: false })
  }

  const handleSubmit = async () => {
    if (name === '') return setModal("Full Name can't be empty.")
    // if (validateEmail(email) === false)
    //   return setModal((modal) => ({
    //     ...modal,
    //     isOpen: true,
    //     message: 'Invalid Email.',
    //     type: 'error',
    //   }))

    // if (validatePassword(password) === false)
    //   return setModal((modal) => ({
    //     ...modal,
    //     isOpen: true,
    //     message: 'Invalid Password.',
    //     type: 'error',
    //   }))

    // if (password !== rePassword)
    //   return setModal((modal) => ({
    //     ...modal,
    //     isOpen: true,
    //     message: 'Password does not match.',
    //     type: 'error',
    //   }))
    //   all good, send request to create user
    try {
      const res = await axios.post(
        `${API_URL}/user`,
        {
          name,
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(res)
    } catch (error) {
      setModal({
        isOpen: true,
        message: error.response?.data || error.message,
        title: 'Error!',
        type: 'error',
      })
      console.error(error)
    }
  }

  const handleClosePasswordPolicyModal = () =>
    setIsPasswordPolicyModalOpen(false)

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
      <Modal
        open={isPasswordPolicyModalOpen}
        onClose={handleClosePasswordPolicyModal}
      >
        <Modal.Header>
          <Modal.Title>Password Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List>
            <List.Item>Minimum 8 characters</List.Item>
            <List.Item>Maximum 20 characters</List.Item>
            <List.Item>At least one uppercase letter</List.Item>
            <List.Item>At least one lowercase letter</List.Item>
            <List.Item>At least one number</List.Item>
            <List.Item>At least one special character</List.Item>
          </List>
        </Modal.Body>
      </Modal>

      <Container>
        <Content>
          <Stack
            alignItems='center'
            justifyContent='center'
            style={{ height: '100%' }}
          >
            <Panel header='Sign Up' bordered style={{ width: 400 }}>
              <Form fluid onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.ControlLabel>Full Name</Form.ControlLabel>
                  <Form.Control
                    name='name'
                    type='name'
                    value={name}
                    onChange={(value) => handleChange('name', value)}
                    errorMessage={nameErrorMessage}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Email address</Form.ControlLabel>
                  <Form.Control
                    name='email'
                    value={email}
                    onChange={(value) => handleChange('email', value)}
                    errorMessage={emailErrorMessage}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    name='password'
                    autoComplete='off'
                    accepter={Password}
                    value={password}
                    onChange={(value) => handleChange('password', value)}
                    errorMessage={passwordErrorMessage}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Re-enter Password</Form.ControlLabel>
                  <Form.Control
                    name='password'
                    autoComplete='off'
                    accepter={Password}
                    value={rePassword}
                    onChange={(value) => handleChange('rePassword', value)}
                    disabled={isRePasswordEnabled === false}
                    errorMessage={rePasswordErrorMessage}
                  />
                </Form.Group>

                <VStack spacing={10}>
                  <Button appearance='primary' block type='submit'>
                    Create an account
                  </Button>
                  {/* <a href='#'>Forgot password?</a> */}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/login')}
                  >
                    Already have an account? Click here to login.
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsPasswordPolicyModalOpen(true)}
                  >
                    Click here to see password policy.
                  </a>
                </VStack>
              </Form>
            </Panel>
          </Stack>
        </Content>
      </Container>
    </>
  )
}

export default SignUp
