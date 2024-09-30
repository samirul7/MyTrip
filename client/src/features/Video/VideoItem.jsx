import styles from './VideoItem.module.css'

const VideoItem = ({ video }) => {
  return (
    <div className={styles.videoItem}>
      <video controls className={styles.video}>
        <source src={video.url} type='video/mp4' />
      </video>
    </div>
  )
}
export default VideoItem
