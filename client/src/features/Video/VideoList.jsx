import styles from './VideoList.module.css'

import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import privateAxios from '../../app/api/privateAxios'
import Message from '../../components/Message/Message'
import VideoItem from './VideoItem'

const VideoList = () => {
  const params = useParams()

  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`${params.id}-videos`],
    queryFn: async () =>
      (
        await privateAxios.get('/video', {
          params: {
            tripId: params.id,
          },
        })
      ).data,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <div className={styles.videoList}>
      {videos.length === 0 ? (
        <Message>
          You don&apos;t have a video.
          <br />
          Upload video to see it here.
        </Message>
      ) : (
        videos.map((video) => <VideoItem key={video._id} video={video} />)
      )}
    </div>
  )
}
export default VideoList
