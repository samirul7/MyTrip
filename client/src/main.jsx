import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CustomProvider } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomProvider theme='light'>
      <App />
    </CustomProvider>
  </StrictMode>
)
