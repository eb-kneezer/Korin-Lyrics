import React,{useContext, useEffect} from 'react'
import {MusicContext} from '../../context'
import {useParams} from 'react-router-dom'
// import Search from '../../Components/Search/Search'

import styles from './SearchResult.module.css'
import Loading from '../../Components/Loading/Loading'
import SingleMusic from '../../Components/SingleMusic/SingleMusic';
import SingleArtist from '../../Components/SingleArtist/SingleArtist';



export default function SearchResult() {

  const {queryID} = useParams()
  
  const {getQuery, result, search} = useContext(MusicContext);
  const [searchResult, setSearchResult] = result;
  const [query] = search;

useEffect(() => {

  setSearchResult(null)
  getQuery(queryID)//eslint-disable-next-line react-hooks/exhaustive-deps
}, [queryID])




  // console.log(searchResult)

  return (
    <div className={styles.container}>
      {/* <Search /> */}
      <h1>{`Search results for "${query}"`}</h1>
      <div className={styles.resultsContainer}>
        <div className={styles.trackResult}>
          <h3>Tracks</h3>
          <div className={styles.trackContainer}>
            {
              searchResult ?
              searchResult.songResult.map(item => (
                <SingleMusic
                key={item.key}
                songID={item.key}
                title={item.title}
                artist={item.subtitle}
                image={item.image}
                artistID={item.id}
                />
              )):
              <Loading type="searchtrack"/>

             } 
          </div>
        </div>
        <div className={styles.artistResult}>
          <h3>Artists</h3>
          <div className={styles.artistContainer}>
            {
              searchResult ?
              searchResult.artistResult.map(item => (
                <SingleArtist
                key={item.id}
                artist={item.name}
                image={item.avatar}
                artistID={item.id}
                />
              )):
            <Loading type="searchartist"/>
              }

          </div>
        </div>
      </div>

    </div>
  )
}
