import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {MusicContext} from '../../context'

import styles from './Search.module.css'

export default function Search() {

  const history = useHistory()

  const {search} = useContext(MusicContext)
  const [query, setQuery] = search

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      // getQuery(query)
      history.push(`/search/${query}`)
      event.target.value = ""

    }
  }

  return (

    <div className={styles.mainContainer}>
      <input 
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      className={styles.searchInput} 
      placeholder="what are you looking for?"
      type="search" 
      id="search" />
      <button 
      onClick={() => history.push(`/search/${query}`)}
      className={styles.searchButton}>go</button>
    </div>
  )
}