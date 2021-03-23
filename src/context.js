import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

import {
  shazamBaseUrl,
  billboardBaseUrl,
  formatSingleMusic,
  formatDataShazam, 
  formatBillboardAlbum, 
  formatBillboardArtist, 
  constOptions1,
  constOptions2,
} from './utilities'


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



  // ---------------UseEffect for DATA NEEDED ON START ----------
  
  useEffect(() => {

    const getSongsUS = async () => {
      const options = {
        ...constOptions1,
        url: `${shazamBaseUrl}charts/track`,
        params: {
          locale: 'en-US',
          listId: 'ip-country-chart-US',
          pageSize: '14',
          startFrom: '0'
        }
      }

      const response = await axios.request(options)
      try {
        const returned = await response.data
        setHomePopularUS(formatDataShazam(returned.tracks))
      } catch (err) {
        console.log(err)
      }
    }
    
    const getSongsUK = async () => {
      const options = {
        ...constOptions1,
        url: `${shazamBaseUrl}charts/track`,
        params: {
          locale: 'en-US',
          listId: 'ip-country-chart-GB',
          pageSize: '14',
          startFrom: '0'
        }
      }

      const response = await axios.request(options)
      try {
        const returned = await response.data
        setHomePopularUK(formatDataShazam(returned.tracks))
      } catch (err) {
        console.log(err)
      }
    }


    const getBillboardArtists = async () => {
      const options = {
        ...constOptions2,
        url: `${billboardBaseUrl}artist-100`,
        params: {
          date: '2021-03-20',
          range: '1-9'
        }
      }

      const response = await axios.request(options)
      try {
        const returned = await response.data
        setHomePopularArtists(formatBillboardArtist(returned.content))
      } catch (err) {
        console.log(err)
      }
    }

    const getBillboardAlbums = async () => {
      const options = {
        ...constOptions2,
        url: `${billboardBaseUrl}billboard-200`,
        params: {
          date: '2021-03-20',
          range: '1-9'
        }
      }

      const response = await axios.request(options)
      try {
        const returned = await response.data
        setHomePopularAlbums(formatBillboardAlbum(returned.content))
      } catch (err) {
        console.log(err)
      }
    }

    getSongsUS()
    getSongsUK()
    getBillboardArtists()
    getBillboardAlbums()

  }, [])




  // ------------SEARCH QUERY FUNCTION -------------

  const getQuery = async (query) => {
    const options = {
      ...constOptions1, 
      url: `${shazamBaseUrl}search`,
      params: {
        term: query,
        locale: 'en-US',
        offset: '0',
        limit: '5'
      }
    }

    const response = await axios.request(options)
    try {
      const returned = await response.data
      console.log(returned)
    } catch(err) {
      console.log(err)
    }
  }


  // ------------GET SINGLE MUSIC DETAILS--------------- 

  const getMusic = async (musicID) => {
    const options = {
      ...constOptions1,
      url: `${shazamBaseUrl}songs/get-details`,
      params: {
        key: musicID,
        locale: 'en-US'
      }
    }

    const response = await axios.request(options)
    try {
      const returned = await response.data
      setMusic(formatSingleMusic(returned))

    } catch(err) {
      console.log(err)
    }
  }

  // --------------GET SINGLE ARTIST DETAILS--------------

  const getArtist = async (artistID) => {
    const options = {
      ...constOptions1,
      url: `${shazamBaseUrl}songs/list-artist-top-tracks`,
      params: {
        id: artistID,
        locale: 'en-US'
      }
    }

    const response = await axios.request(options)
    try{
      const returned = await response.data
      console.log(returned)
    } catch(err) {
      console.log(err)
    }
  }
  // const getAlbum = (albumID) => {

  // } 

  return (
    <MusicContext.Provider value={{
      popularUS: [homePopularUS],
      popularUK: [homePopularUK],
      popularArtists: [homePopularArtists],
      popularAlbums: [homePopularAlbums],
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
