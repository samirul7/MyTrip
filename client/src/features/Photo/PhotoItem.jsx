import styles from './PhotoItem.module.css'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MdDeleteOutline } from 'react-icons/md'

import privateAxios from '../../app/api/privateAxios'

const PhotoItem = ({ photo }) => {
  const params = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: [`${params.id}-photos`],
    mutationFn: async () => {
      const {
        data: { url },
      } = await privateAxios.delete('/photo', {
        params: {
          _id: photo._id,
        },
      })
      return await axios.delete(url)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(`${params.id}-photos`)
    },
  })

  return (
    <div className={styles.container}>
      <MdDeleteOutline className={styles.deleteIcon} onClick={mutate} />
      <img className={styles.img} key={photo._id} src={photo.url} />
    </div>
  )
}
export default PhotoItem
