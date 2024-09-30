import PhotoList from './PhotoList'
import PhotoUpload from './PhotoUpload'
import CustomAccordion from '../../components/Accordion/CustomAccordion'

const Photo = () => {
  return (
    <CustomAccordion header='Photo Section'>
      <PhotoUpload />
      <PhotoList />
    </CustomAccordion>
  )
}
export default Photo
