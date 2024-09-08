import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout/AppLayout'
import Trip from './features/Trip/Trip'
import NewTrip from './features/NewTrip/NewTrip'
import { getTripInfo } from './services/apiTrip'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/trip/:id',
        element: <Trip />,
        loader: async ({ params }) => {
          const data = await getTripInfo(params.id)
          return data
        },
      },
      {
        path: '/newTrip',
        element: <NewTrip />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
