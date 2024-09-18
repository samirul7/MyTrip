import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CustomProvider } from 'rsuite'
import { Provider } from 'react-redux'
import store from './app/store.js'
import 'rsuite/dist/rsuite.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomProvider theme='light'>
      <Provider store={store}>
        <App />
      </Provider>
    </CustomProvider>
  </StrictMode>
)
