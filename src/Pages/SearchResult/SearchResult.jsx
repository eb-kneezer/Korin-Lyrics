import React from 'react'

// import Search from '../../Components/Search/Search'

import styles from './SearchResult.module.css'

export default function SearchResult() {
  return (
    <div className={styles.search}>
      {/* <Search /> */}
      <h1>{`Search results for "query"`}</h1>

    </div>
  )
}
