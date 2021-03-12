import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SingleMusic.module.css'
import img from '../../assets/hero.jpeg'

export default function SingleMusic({ title, artist, image, songID, artistID }) {
  return (
    <div className={styles.singleMusic}>
      <Link to={`/song/${songID}`} >
        <img src={image || img} alt="music" />
        <div className={styles.musicInfo}>
          <h3>{title || 'title'}</h3>
          <p id={artistID}>{artist || 'artist'}</p>
        </div>
      </Link>
    </div>
  )
}
