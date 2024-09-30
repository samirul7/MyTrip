import { useState } from 'react'
import styles from './CustomAccordion.module.css'

import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'

const CustomAccordion = ({ header, children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className={styles.accordion}>
      <div className={styles.header}>
        <h3>{header}</h3>
        <span
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className={styles.dropIconContainer}
        >
          {isOpen ? (
            <RiArrowDropUpLine className={styles.dropIcon} />
          ) : (
            <RiArrowDropDownLine className={styles.dropIcon} />
          )}
        </span>
      </div>
      <div className={styles.main}>{isOpen && children}</div>
    </div>
  )
}
export default CustomAccordion
