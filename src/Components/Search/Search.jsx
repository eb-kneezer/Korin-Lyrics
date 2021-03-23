import React from 'react'

import styles from './Search.module.css'

export default function Search() {
  return (

    <div className={styles.mainContainer}>
      <input className={styles.searchInput} placeholder="what are you looking for?" type="search" id="search" />
      <a className={styles.searchButton} >go</a>
    </div>
  )
}