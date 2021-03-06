import React, { useEffect, useContext } from 'react'
import SingleAlbum from '../../Components/SingleAlbum/SingleAlbum'
import SingleArtist from '../../Components/SingleArtist/SingleArtist'
import SingleMusic from '../../Components/SingleMusic/SingleMusic'
import { MusicContext } from '../../context'
import apikey from '../../key'
import styles from './Home.module.css'
import Loading from '../../Components/Loading/Loading'
import Search from '../../Components/Search/Search'

export default function Home() {
  const { popularUK, popularUS, popularArtists, popularAlbums } = useContext(MusicContext);
  const [homePopularUK, setHomePopularUK] = popularUK;
  const [homePopularUS, setHomePopularUS] = popularUS;
  const [homePopularArtists, setHomePopularArtists] = popularArtists;
  const [homePopularAlbums, setHomePopularAlbums] = popularAlbums;


  useEffect(() => {
    const getSongsUS = async () => {
      const response = await fetch("https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=ip-country-chart-US&pageSize=20&startFrom=0", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": apikey,
          "x-rapidapi-host": "shazam.p.rapidapi.com"
        }
      })
      const data = await response.json()
      setHomePopularUS(formatDataShazam(data.tracks))
    }

    const getSongsUK = async () => {
      const response = await fetch("https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=ip-country-chart-GB&pageSize=20&startFrom=0", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": apikey,
          "x-rapidapi-host": "shazam.p.rapidapi.com"
        }
      })
      const data = await response.json()
      setHomePopularUK(formatDataShazam(data.tracks))
    }

    const getBillboardArtists = async () => {
      const response = await fetch("https://billboard-api2.p.rapidapi.com/artist-100?date=2021-02-11&range=1-10", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": apikey,
          "x-rapidapi-host": "billboard-api2.p.rapidapi.com"
        }
      })
      const data = await response.json()
      setHomePopularArtists(formatBillboardArtist(data.content))
    }

    const getBillboardAlbums = async () => {
      const response = await fetch("https://billboard-api2.p.rapidapi.com/billboard-200?date=2021-02-11&range=1-10", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": apikey,
          "x-rapidapi-host": "billboard-api2.p.rapidapi.com"
        }
      })
      const data = await response.json()
      setHomePopularAlbums(formatBillboardAlbum(data.content))
    }


    // getSongsUS()
    // getSongsUK()
    // getBillboardArtists()
    // getBillboardAlbums()
  }, []);


  const formatDataShazam = (data) => {
    const newTracks = data.map(track => {
      return {
        'key': track.key,
        'title': track.title,
        'subtitle': track.subtitle,
        'image': track.images.coverart,
        'artistId': track.artists
      }
    })
    return (newTracks.slice(0, 14));
  }

  const formatBillboardArtist = (data) => {
    let formatted = []
    for (let item in data) {
      formatted.push({
        'artist': data[item].artist,
        'key': data[item].rank
      })
    }
    return formatted.slice(0, 9);
  }
  const formatBillboardAlbum = (data) => {
    let formatted = []
    for (let item in data) {
      formatted.push({
        'album': data[item].album,
        'artist': data[item].artist,
        'key': data[item].rank
      })
    }
    return formatted.slice(0, 9);
  }
  // let list = []
  // for (let item in topTen) {
  //   list.push(<SingleMusic key={topTen[item].rank} title={topTen[item].title} artist={topTen[item].artist}/>) 
  // }
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
                    <SingleMusic key={item.key} title={item.title} artist={item.subtitle} image={item.image} artistID={item.artistId} />
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
              {homePopularAlbums > 0 ?
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