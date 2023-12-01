import React from 'react'
import styles from "./loading.module.css"
const Loading = () => {
  return (
      <div>
          <div className={styles.lds}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading