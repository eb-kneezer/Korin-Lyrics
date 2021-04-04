import React from 'react'
import styles from './Loading.module.css'

export default function Loading({ type }) {

  let homeSong = [];
  let homeArtAlb = [];
  let searchTrack = [];
  let searchArtist = [];

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

  for (let i = 0; i < 5; i++) {
    searchArtist.push(
      <div className={styles.singleArtAlb} key={i}>
        <div className={styles.singleImgArtAlb}></div>
        <div className={styles.singleInfoArtAlb}></div>
      </div>)
  }

  for (let i = 0; i < 5; i++) {
    searchTrack.push(
      <div className={styles.single} key={i}>
        <div className={styles.singleImg}></div>
        <div className={styles.singleInfo}></div>
      </div>)
  }




  const render = () => {
    if (type === "song") {
      return homeSong
    } else if (type === "artalb") {
      return homeArtAlb;
    } else if (type === "searchtrack") {
      return searchTrack;
    } else if (type === "searchartist") {
      return searchArtist;
    }
  }

  return (
    render()
  )
}
