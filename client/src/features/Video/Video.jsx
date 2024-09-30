import CustomAccordion from '../../components/Accordion/CustomAccordion'
import VideoUpload from './VideoUpload'
import VideoList from './VideoList'

const Video = () => {
  return (
    <CustomAccordion header='Video Section'>
      <VideoUpload />
      <VideoList />
    </CustomAccordion>
  )
}
export default Video

{
  /* <button
        onClick={async () => {
          const res = await privateAxios.get('/video', {
            params: {
              tripId: params.id,
            },
          })
          console.log(res)
        }}
      >
        Click me to get videos
      </button> */
}
