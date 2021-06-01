import React from 'react'

import styles from './SingleArtist.module.css' 
import img from '../../assets/artist.svg'
import { Link } from 'react-router-dom'
export default function SingleArtist({artist, image = null, artistID = null}) {
  return (
      <Link className={styles.singleLink} to={`/artist/${artistID}`}>
        <div className={styles.singleArtist}>
            <img className={styles.artistImg} src={image? image: img} alt="artist"/>
            <h4 id={artistID}>{artist}</h4>
        </div>
      </Link>
  )
}
