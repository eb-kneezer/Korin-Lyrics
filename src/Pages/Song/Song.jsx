import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './Song.module.css'
import Loading from '../../Components/Loading/Loading'

export default function Song() {
  const { musicID } = useParams()
  console.log(musicID)
  return (
    <div className={styles.container}>

      <section className={styles.songInfo}>
        <div className={styles.songCover}>
          <div className={styles.songTitle}>
            <h1>Real Life</h1>
            <h3>Imagine Dragons</h3>
          </div>
        </div>
        <div className={styles.songDetails}>
          <p>
            genre: <strong>Indie Rock</strong><br />
            album: <strong>Originals</strong><br />
            released: <strong>2018</strong><br />
            label: <strong>Atlantic Records</strong>

          </p>
        </div>
      </section>

      <section className={styles.songLyrics}>
        <div className={styles.lyricsInfo}>
          <h2>Real Life Lyrics</h2>
          <em>hint: go in the bathroom, you'll sound better</em>
        </div>
        <hr />
        <div className={styles.lyricsBody}>
          <div className={styles.lyricsContainer}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repellat nemo autem nam quis voluptatibus neque sit illo at cupiditate accusamus ea repudiandae error voluptates quibusdam unde velit expedita, non alias ullam saepe nisi explicabo. Rerum tempore officia temporibus illum nihil ad alias cumque suscipit eum magni nisi quas, cum dolorum ut, asperiores quam earum molestias voluptate iste exercitationem ipsa ipsam sunt reiciendis. Enim facilis odio ipsam, illum beatae consectetur, culpa qui repudiandae, explicabo blanditiis ipsa vero praesentium libero velit ipsum.
          </p>
          </div>
          <div className={styles.lyricsFooter}>
            <p><em>additional song information, youtube link</em></p>
          </div>
        </div>
      </section>

      <section className={styles.popSongs}>
        <h3>Popular songs</h3>
        <div className={styles.popSongsContainer}>
          <Loading type="song" />
        </div>
      </section>

    </div>
  )
}
