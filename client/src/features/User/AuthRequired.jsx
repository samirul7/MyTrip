import { useSelector } from 'react-redux'

const AuthRequired = ({ children }) => {
  const token = useSelector(({ user }) => user.token)
  if (!token) return <p>Unothorized</p>
  return children
}

export default AuthRequired
