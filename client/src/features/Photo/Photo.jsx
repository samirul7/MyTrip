import PhotoList from './PhotoList'
import PhotoUpload from './PhotoUpload'
import CustomAccordion from '../../components/Accordion/CustomAccordion'

const Photo = () => {
  return (
    <CustomAccordion header='PhotoSection'>
      <PhotoUpload />
      <PhotoList />
    </CustomAccordion>
  )
}
export default Photo
