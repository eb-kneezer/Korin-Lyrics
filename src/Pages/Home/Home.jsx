import React, { useContext } from 'react'
import SingleAlbum from '../../Components/SingleAlbum/SingleAlbum'
import SingleArtist from '../../Components/SingleArtist/SingleArtist'
import SingleMusic from '../../Components/SingleMusic/SingleMusic'
import { MusicContext } from '../../context'

import styles from './Home.module.css'
import Loading from '../../Components/Loading/Loading'
import Search from '../../Components/Search/Search'



export default function Home() {
  const { popularUK, popularUS, popularArtists, popularAlbums } = useContext(MusicContext);
  const [homePopularUK] = popularUK;
  const [homePopularUS] = popularUS;
  const [homePopularArtists] = popularArtists;
  const [homePopularAlbums] = popularAlbums;


  return (
    <div>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroCta}>
            <h1><span>Korin</span> along with your faves</h1>
            <h3>discover new songs</h3>
            <Search />
          </div>
        </div>
      </section>



      <section className={styles.popmusic}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular songs in the US</h2>
            </div>
            <div className={styles.popitems}>{
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
          </div>
        </div>
      </section>

      <section className={styles.popmusic}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular songs in the UK</h2>
            </div>
            <div className={styles.popitems}>
              {
                homePopularUK.length > 0 ?
                  homePopularUK.map(item => (
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
          </div>
        </div>
      </section>

      <section className={styles.artists}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular artists</h2>
            </div>
            <div className={styles.popartists}>
              {homePopularArtists.length > 0 ?
                homePopularArtists.map(item => (
                  <SingleArtist key={item.key} artist={item.artist} />
                )) :
                <Loading type="artalb" />
              }
            </div>
          </div>
        </div>
      </section>

      <section className={styles.artists}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular albums</h2>
            </div>
            <div className={styles.popartists}>
              {homePopularAlbums.length > 0 ?
                homePopularAlbums.map(item => (
                  <SingleAlbum key={item.key} title={item.album} artist={item.artist} />
                )) :
                <Loading type="artalb" />
              }
            </div>
          </div>
        </div>
      </section>




    </div>
  )
}