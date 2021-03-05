import React from 'react'

import styles from './SingleMusic.module.css'
import img from '../../assets/hero.jpeg'

export default function SingleMusic({title, artist, image, artistID}) {
  return (
    <div className={styles.singleMusic}>
      <img src={image || img } alt="music"/>
      <div className={styles.musicInfo}>
        <h3>{title || 'title'}</h3>
        <p>{artist || 'artist'}</p>
      </div>
    </div>
  )
}
