import { useNavigate } from 'react-router-dom'
import styles from './TripItem.module.css'

const TripItem = ({ trip }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.trip} onClick={() => navigate(`/trip/${trip._id}`)}>
      <h3
        style={{
          textTransform: 'capitalize',
        }}
      >
        {trip.name}
      </h3>
      <p>Trip id: {trip._id}</p>
      <p>Location: {trip.location}</p>
    </div>
  )
}
export default TripItem
