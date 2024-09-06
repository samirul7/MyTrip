import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout/AppLayout'
import Trip from './features/Trip/Trip'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/trip',
        element: <Trip />,
      },
      {
        path: '/newTrip',
        element: <p>New Trip</p>,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
