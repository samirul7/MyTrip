import styles from './Trip.module.css'

import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import privateAxios from '../../app/api/privateAxios'
import Photo from '../Photo/Photo'
import Video from '../Video/Video'

const Trip = () => {
  const params = useParams()

  const {
    data: tripInfo,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['tripInfo'],
    queryFn: async () =>
      (
        await privateAxios.get('/trip', {
          params: {
            id: params.id,
          },
        })
      ).data,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <div className={styles.trip}>
      <div className={styles.tripHeading}>
        <h2 className={styles.name}>{tripInfo.name}</h2>
        <p className={styles.location}>Location: {tripInfo.location}</p>
      </div>
      <Photo />
      {/* <Accordion>
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
      </Accordion> */}
      <Video />
    </div>
  )
}

export default Trip
