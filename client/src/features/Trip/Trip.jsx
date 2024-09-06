import styles from './Trip.module.css'
import { Accordion, Heading, HStack, Text } from 'rsuite'

const tripInfo = {
  _id: '123',
  name: 'Goa Trip',
  locatin: 'Goa',
  media: {
    photos: [
      {
        _id: 'ph_001',
        title: 'Photo 1',
        url: 'https://images.unsplash.com/photo-1536759808958-bcc29b661ec6',
      },
      {
        _id: '4536',
        title: 'Photo 2',
        url: 'https://images.unsplash.com/photo-1503965830912-6d7b07921cd1',
      },
    ],
    videos: [
      {
        _id: '53256',
        title: 'Video 1',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        _id: '0252592',
        title: 'Video 2',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      },
    ],
  },
}

const Trip = () => {
  return (
    <>
      <HStack justifyContent='space-between' style={{ padding: '0 20px' }}>
        <Heading>{tripInfo.name}</Heading>
        <Text>Location: {tripInfo.locatin}</Text>
      </HStack>
      <Accordion>
        <Accordion.Panel header='Photos' defaultExpanded>
          {tripInfo.media.photos.map((photo) => (
            <img className={styles.img} key={photo._id} src={photo.url} />
          ))}
        </Accordion.Panel>
      </Accordion>
      <Accordion>
        <Accordion.Panel header='Videos' defaultExpanded>
          {tripInfo.media.videos.map((video) => (
            <video
              key={video._id}
              width='550px'
              style={{ padding: '3px' }}
              controls
            >
              <source src={video.url} type='video/mp4' />
            </video>
          ))}
        </Accordion.Panel>
      </Accordion>
    </>
  )
}
export default Trip
