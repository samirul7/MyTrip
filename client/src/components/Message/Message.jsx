import styles from './Message.module.css'

const Message = ({ children, type }) => {
  return (
    <p
      className={`${type == 'info' ? styles.info : styles.error} ${
        styles.message
      }`}
    >
      {children}
    </p>
  )
}
export default Message
