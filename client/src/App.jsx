import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout/AppLayout'
import Trip from './features/Trip/Trip'
import NewTrip from './features/NewTrip/NewTrip'
import { getTripInfo } from './services/apiTrip'
import PhotoList, {
  loader as photoLoader,
} from './features/Photo/PhotoList/PhotoList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'trip/:id',
        element: <Trip />,
        loader: async ({ params }) => {
          const data = await getTripInfo(params.id)
          return data
        },
        children: [
          {
            path: 'photo',
            element: <PhotoList />,
            loader: photoLoader,
          },
        ],
      },
      {
        path: 'newTrip',
        element: <NewTrip />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
