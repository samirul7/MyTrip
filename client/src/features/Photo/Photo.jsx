import { Accordion } from 'rsuite'

// import UploadPhoto from './UploadPhoto/UploadPhoto'
import PhotoList from './PhotoList/PhotoList'
import PhotoUpload from './PhotoUpload'

const Photo = () => {
  return (
    <Accordion>
      <Accordion.Panel header='Photos Section' defaultExpanded>
        {/* <UploadPhoto /> */}
        <PhotoUpload />
        <Accordion>
          <Accordion.Panel header='Photos' defaultExpanded>
            <PhotoList />
          </Accordion.Panel>
        </Accordion>
      </Accordion.Panel>
    </Accordion>
  )
}
export default Photo
