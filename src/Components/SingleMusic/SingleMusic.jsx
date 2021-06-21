import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SingleMusic.module.css'
import img from '../../assets/hero.jpeg'

export default function SingleMusic({ title, artist, image, songID, artistID }) {
  return (
    <div className={styles.singleMusic}>
      <Link className={styles.singleLink} to={`/song/${songID}`} >
        <img src={image} alt="music" />
        <div className={styles.musicInfo}>
          <p className={styles.title}>{title}</p>
          <p id={artistID}>{artist}</p>
        </div>
      </Link>
    </div>
  )
}
