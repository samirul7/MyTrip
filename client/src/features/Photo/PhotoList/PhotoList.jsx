import { useLoaderData, useParams } from 'react-router-dom'
import { API_URL } from '../../../services/apiTrip'

import styles from './PhotoList.module.css'
import axios from 'axios'

const PhotoList = () => {
  // const { data: photos } = useLoaderData()
  const photos = useLoaderData()
  console.log(photos)

  // return <p>Happy 😊</p>

  return (
    <>
      {/* <p> I am photoList</p> */}
      {photos.map((photo) => (
        <img className={styles.img} key={photo._id} src={photo.url} />
      ))}
    </>
  )
}

export default PhotoList

export async function loader({ params }) {
  try {
    const res = await axios.get(`${API_URL}/photo`, {
      params: { tripId: params.id },
    })
    if (res.status === 200) return res.data
    throw Error('Something went wrong')
  } catch (error) {
    console.error('Something went wrong', error)
  }
}
