import { useLoaderData } from 'react-router-dom'
import styles from './Trip.module.css'
import { Accordion, Heading, HStack, Text } from 'rsuite'

const Trip = () => {
  const tripInfo = useLoaderData()
  return (
    <>
      <HStack justifyContent='space-between' style={{ padding: '0 20px' }}>
        <Heading>{tripInfo.name}</Heading>
        <Text>Location: {tripInfo.location}</Text>
      </HStack>
      <Accordion>
        <Accordion.Panel header='Photos' defaultExpanded>
          {tripInfo.media?.photos.map((photo) => (
            <img className={styles.img} key={photo._id} src={photo.url} />
          ))}
        </Accordion.Panel>
      </Accordion>
      <Accordion>
        <Accordion.Panel header='Videos' defaultExpanded>
          {tripInfo.media?.videos.map((video) => (
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
