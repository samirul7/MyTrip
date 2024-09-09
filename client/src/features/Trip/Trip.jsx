import styles from './Trip.module.css'

import { useLoaderData } from 'react-router-dom'
import { Accordion, Heading, HStack, Text } from 'rsuite'
import PhotoList from '../Photo/PhotoList/PhotoList'
import { useState } from 'react'

const Trip = () => {
  const tripInfo = useLoaderData()
  const [showVideos, setShowVideos] = useState(true)
  return (
    <>
      <HStack justifyContent='space-between' style={{ padding: '0 20px' }}>
        <Heading>{tripInfo.name}</Heading>
        <Text>Location: {tripInfo.location}</Text>
      </HStack>
      <PhotoList photos={tripInfo.media?.photos} />
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
