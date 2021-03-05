import React from 'react'

import styles from './SingleArtist.module.css' 
import img from '../../assets/artist.svg'
export default function SingleArtist({artist}) {
  return (
    <div className={styles.singleArtist}>
      <img className={styles.artistImg} src={img} alt="artist"/>
      <h3>{artist}</h3>
    </div>
  )
}
