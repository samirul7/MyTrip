import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppLayout from './ui/AppLayout/AppLayout'
import Trip from './features/Trip/Trip'
// import { getTripInfo } from './services/apiTrip'
import Login from './features/User/Login/Login'
import SignUp from './features/User/SignUp/SignUp'
import AuthRequired from './features/User/AuthRequired'
import SearchTrip from './features/Trip/SearchTrip'
import CreateTrip from './features/Trip/CreateTrip'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'trip/:id',
        element: (
          // <AuthRequired>
          <Trip />
          // </AuthRequired>
        ),
      },
      {
        path: 'trip/new',
        element: (
          <AuthRequired>
            <CreateTrip />
          </AuthRequired>
        ),
      },
      {
        path: 'searchTrip',
        element: (
          <AuthRequired>
            <SearchTrip />
          </AuthRequired>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
])

const client = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
