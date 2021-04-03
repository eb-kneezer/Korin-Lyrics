import React, {useContext} from 'react'

import {MusicContext} from '../../context'

import styles from './Search.module.css'

export default function Search() {


  const {search} = useContext(MusicContext)
  const [query, setQuery] = search

  const handleChange = (event) => {
    console.log(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      setQuery(event.target.value)
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
      <a className={styles.searchButton} >go</a>
    </div>
  )
}