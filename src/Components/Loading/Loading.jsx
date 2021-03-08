import React from 'react'
import styles from './Loading.module.css'

export default function Loading({ type }) {

  let homeSong = [];
  let homeArtAlb = [];

  for (let i = 0; i < 14; i++) {
    homeSong.push(
      <div className={styles.single} key={i}>
        <div className={styles.singleImg}></div>
        <div className={styles.singleInfo}></div>
      </div>)
  }

  for (let i = 0; i < 9; i++) {
    homeArtAlb.push(
      <div className={styles.singleArtAlb} key={i}>
        <div className={styles.singleImgArtAlb}></div>
        <div className={styles.singleInfoArtAlb}></div>
      </div>)
  }


  const render = () => {
    if (type === "song") {
      return homeSong
    } else {
      return homeArtAlb;
    }
  }

  return (
    render()
  )
}
