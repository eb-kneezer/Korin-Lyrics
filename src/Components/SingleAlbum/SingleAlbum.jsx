import React from 'react'

import styles from './SingleAlbum.module.css'
import img from '../../assets/album.svg'

export default function SingleAlbum({artist, title}) {
  return (
    <div className={styles.singleAlbum}>
      <img className={styles.albumImg} src={img} alt="album"/>
      <div className={styles.albumInfo}>
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </div>
  )
}
