import styles from './PhotoList.module.css'

import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import PhotoItem from '../PhotoItem'
import privateAxios from '../../../app/api/privateAxios'

const PhotoList = () => {
  const params = useParams()

  const {
    data: photos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`${params.id}-photos`],
    queryFn: async () =>
      (
        await privateAxios.get(`/photo`, {
          params: { tripId: params.id },
        })
      ).data,
  })

  if (isError) return <p>Error</p>
  if (isLoading) return <p>Loading</p>

  return (
    <div className={styles.photoList}>
      {photos.map((photo) => (
        <PhotoItem key={photo._id} photo={photo} />
      ))}
    </div>
  )
}

export default PhotoList
