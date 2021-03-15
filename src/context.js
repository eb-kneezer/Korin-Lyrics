import React, { createContext, useState } from 'react'
import apikey from './key'

export const MusicContext = createContext(null);

export const MusicContextProvider = ({ children }) => {


  // -------------SET STATE-------------

  const [homePopularUS, setHomePopularUS] = useState([])
  const [homePopularUK, setHomePopularUK] = useState([])
  const [homePopularArtists, setHomePopularArtists] = useState([])
  const [homePopularAlbums, setHomePopularAlbums] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [music, setMusic] = useState(null)
  const [artist, setArtist] = useState(null)
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
    console.log(data)
    const formattedData = {
      key: data.key,
      title: data.title,
      artist: data.subtitle,
      coverImg: data.images.coverarthq,
      backgroundImg: data.images.background,
      shazam: data.url,
      artistID: data.artists[0].id,
      genre: data.genres.primary,
      album: data.sections[0].metadata[0].text,
      label: data.sections[0].metadata[1].text,
      released: data.sections[0].metadata[2].text,
      lyrics: data.sections[1].text.join("\n"),
      footer: data.sections[1].footer,
      youtubeCaption: data.sections[2].youtubeurl.caption,
      youtubeURL: data.sections[2].youtubeurl.actions[0].uri
    };
    setMusic(formattedData)
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
      song: [music, setMusic],
      artist: [artist, setArtist],
      result: [searchResult, setSearchResult],
      query: [query, setQuery],
      getQuery,
      getMusic,
      getArtist,
      // getAlbum
    }}>
      {children}
    </MusicContext.Provider>
  )
}
