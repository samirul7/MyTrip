import TripItem from './TripItem'
import styles from './TripList.module.css'

const TripList = ({ trips }) => {
  return (
    <div className={styles.trip_list}>
      {trips.map((trip) => (
        <TripItem key={trip._id} trip={trip} />
      ))}
    </div>
  )
}
export default TripList
