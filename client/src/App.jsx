import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout/AppLayout'
import Trip from './features/Trip/Trip'
import NewTrip from './features/NewTrip/NewTrip'
import { getTripInfo } from './services/apiTrip'
import PhotoList, {
  loader as photoLoader,
} from './features/Photo/PhotoList/PhotoList'
import Login from './features/User/Login/Login'
import SignUp from './features/User/SignUp/SignUp'
import AuthRequired from './features/User/AuthRequired'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'trip/:id',
        element: (
          <AuthRequired>
            <Trip />
          </AuthRequired>
        ),
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
        element: (
          <AuthRequired>
            <NewTrip />
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

const App = () => {
  return <RouterProvider router={router} />
}

export default App
