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
} from 'rsuite'

import { Unvisible, Visible } from '@rsuite/icons'

import { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    console.log('I handleSubmit being called')
  }

  return (
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
  )
}

export default Login
