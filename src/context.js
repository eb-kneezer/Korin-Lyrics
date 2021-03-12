import React, { createContext, useState } from 'react'
import apikey from './key'

export const MusicContext = createContext(null);

export const MusicContextProvider = (props) => {


  // -------------SET STATE-------------

  const [homePopularUS, setHomePopularUS] = useState([])
  const [homePopularUK, setHomePopularUK] = useState([])
  const [homePopularArtists, setHomePopularArtists] = useState([])
  const [homePopularAlbums, setHomePopularAlbums] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [music, setMusic] = useState({})
  const [artist, setArtist] = useState({})
  const [query, setQuery] = useState('');


  // ------------SEARCH QUERY FUNCTION -------------

  const getQuery = async (query) => {
    const response = await fetch(`https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US&offset=0&limit=5`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apikey,
        "x-rapidapi-host": "shazam.p.rapidapi.com"
      }
    })
    const data = await response.json()
    // format return data

    // set formatted data as search result
    // setSearchResult()
  }


  // ------------GET SINGLE MUSIC DETAILS--------------- 

  const getMusic = async (musicID) => {
    const response = await fetch(`https://shazam.p.rapidapi.com/songs/get-details?key=${musicID}&locale=en-US`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apikey,
        "x-rapidapi-host": "shazam.p.rapidapi.com"
      }
    })
    const data = await response.json()
    //  format returned data
    // set formatted data to setMusic
    // setMusic()
  }


  // --------------GET SINGLE ARTIST DETAILS--------------

  const getArtist = async (artistID) => {
    const response = await fetch(`https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=${artistID}&locale=en-US`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apikey,
        "x-rapidapi-host": "shazam.p.rapidapi.com"
      }
    })
    const data = await response.json()
    // format returned data
    // set formatted data to setArtist
    // setArtist()
  }
  // const getAlbum = (albumID) => {

  // } 

  return (
    <MusicContext.Provider value={{
      popularUS: [homePopularUS, setHomePopularUS],
      popularUK: [homePopularUK, setHomePopularUK],
      popularArtists: [homePopularArtists, setHomePopularArtists],
      popularAlbums: [homePopularAlbums, setHomePopularAlbums],
      music: [music, setMusic],
      artist: [artist, setArtist],
      result: [searchResult, setSearchResult],
      query: [query, setQuery],
      getQuery,
      getMusic,
      getArtist,
      // getAlbum
    }}>
      {props.children}
    </MusicContext.Provider>
  )
}
