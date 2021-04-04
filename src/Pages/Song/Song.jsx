import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Song.module.css'
import Loading from '../../Components/Loading/Loading'

import { MusicContext } from '../../context'
import SingleMusic from '../../Components/SingleMusic/SingleMusic'

import img from '../../assets/load.png'
export default function Song() {
  const { popularUS, popularUK, song, getMusic } = useContext(MusicContext)
  const [homePopularUS] = popularUS
  const [homePopularUK] = popularUK
  const [music, setMusic] = song


  const { musicID } = useParams()

  useEffect(() => {
    setMusic(null)
      getMusic(musicID)
  }, [musicID])
  // console.log(music.coverImg)
  // console.log(music)
  return (
    <div className={styles.container}>

      <section className={styles.songInfo}>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${music ? music.coverImg : img}) `,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '100%',
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
          className={styles.songCover}>
          <div className={styles.songTitle}>
            <h1>{music ? music.title : <span className={styles.songTitleLoading}></span>}</h1>
            <h3>{music ? music.artist : <span className={styles.songTitleLoading}></span>}</h3>
          </div>
        </div>
        <div className={styles.songDetails}>
          <p>
            genre: <strong>{music ? music.genre : <span className={styles.songDetailsLoading}></span>}</strong><br />
            album: <strong>{music ? music.album : <span className={styles.songDetailsLoading}></span>}</strong><br />
            released: <strong>{music ? music.released : <span className={styles.songDetailsLoading}></span>}</strong><br />
            label: <strong>{music ? music.label : <span className={styles.songDetailsLoading}></span>}</strong>

          </p>
        </div>
      </section>

      <section className={styles.songLyrics}>
        <div className={styles.lyricsInfo}>
          <h2>{music ? music.title : <span className={styles.songTitleLoading}></span>}</h2>
          <em>hint: get in the shower, you'll sound better</em>
        </div>
        <hr />
        <div className={styles.lyricsBody}>
          <div className={styles.lyricsContainer}>
            <p>{
              music ?
                music.lyrics :
                <>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                  <span className={styles.songDetailsLoading}></span>
                </>
            }
            </p>
          </div>
          <div className={styles.lyricsFooter}>
            <p><em> {music ? music.footer : <span className={styles.songTitleLoading}></span>}
            </em></p>
          </div>
        </div>
      </section>

      <section className={styles.popSongs}>
        <h3>Popular songs</h3>
        <div className={styles.popSongsContainer}>{
          homePopularUS.length > 0 ?
            homePopularUS.map(item => (
              <SingleMusic
                key={item.key}
                songID={item.key}
                title={item.title}
                artist={item.subtitle}
                image={item.image}
                artistID={item.artistId} />
            )) :
            <Loading type="song" />
        }
        </div>
      </section>

    </div>
  )
}
