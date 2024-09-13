import { Accordion } from 'rsuite'
import UploadPhoto from './UploadPhoto/UploadPhoto'
// import PhotoList from './PhotoList/PhotoList'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Photo = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Accordion>
      <Accordion.Panel header='Photos Section'>
        <UploadPhoto />
        <Accordion>
          <Accordion.Panel
            header='Photos'
            onSelect={() => {
              if (isOpen) navigate('')
              else navigate('photo')
              setIsOpen((isOpen) => !isOpen)
            }}
          >
            <Outlet />
          </Accordion.Panel>
        </Accordion>
      </Accordion.Panel>
    </Accordion>
  )
}
export default Photo
