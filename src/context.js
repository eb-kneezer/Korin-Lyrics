import React, { createContext, useState, useEffect } from "react";
import { auth, provider, db } from "./firebase";

import axios from "axios";
import apikey from "./key";

import {
  shazamBaseUrl,
  billboardBaseUrl,
  formatSingleMusic,
  formatDataShazam,
  formatSearchResult,
  formatBillboardAlbum,
  formatBillboardArtist,
  constOptions1,
  constOptions2,
  getImages,
} from "./utilities";

export const MusicContext = createContext(null);

export const MusicContextProvider = ({ children }) => {
  // -------------SET STATE-------------

  const [afroBeats, setAfroBeats] = useState([]);
  const [homePopularUS, setHomePopularUS] = useState([]);
  const [homePopularUK, setHomePopularUK] = useState([]);
  const [homePopularArtists, setHomePopularArtists] = useState([]);
  const [homePopularAlbums, setHomePopularAlbums] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [music, setMusic] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [imgArtist, setImgArtist] = useState(
    JSON.parse(localStorage.getItem("images"))
  );
  const [query, setQuery] = useState("");
  const [user, setUser] = useState("");

  // ---------------UseEffect for DATA NEEDED ON START ----------

  useEffect(() => {
    const getAfroBeats = async () => {
      const options = {
        ...constOptions1,
        url: `${shazamBaseUrl}charts/track`,
        params: {
          locale: "en-US",
          listId: "genre-global-chart-11",
          pageSize: "14",
          startFrom: "0",
        },
      };

      const response = await axios.request(options);
      try {
        const returned = await response.data;
        setAfroBeats(formatDataShazam(returned.tracks));
      } catch (err) {
        console.log(err);
      }
    };

    const getSongsUS = async () => {
      const options = {
        ...constOptions1,
        url: `${shazamBaseUrl}charts/track`,
        params: {
          locale: "en-US",
          listId: "ip-country-chart-US",
          pageSize: "14",
          startFrom: "0",
        },
      };

      const response = await axios.request(options);
      try {
        const returned = await response.data;
        setHomePopularUS(formatDataShazam(returned.tracks));
      } catch (err) {
        console.log(err);
      }
    };

    const getSongsUK = async () => {
      const options = {
        ...constOptions1,
        url: `${shazamBaseUrl}charts/track`,
        params: {
          locale: "en-US",
          listId: "ip-country-chart-GB",
          pageSize: "14",
          startFrom: "0",
        },
      };

      const response = await axios.request(options);
      try {
        const returned = await response.data;
        setHomePopularUK(formatDataShazam(returned.tracks));
      } catch (err) {
        console.log(err);
      }
    };

    const getBillboardArtists = async () => {
      const options = {
        ...constOptions2,
        url: `${billboardBaseUrl}artist-100`,
        params: {
          date: "2021-06-20",
          range: "1-9",
        },
      };

      const response = await axios.request(options);
      try {
        const returned = await response.data;
        setHomePopularArtists(formatBillboardArtist(returned.content));
      } catch (err) {
        console.log(err);
      }
    };

    const getBillboardAlbums = async () => {
      const options = {
        ...constOptions2,
        url: `${billboardBaseUrl}billboard-200`,
        params: {
          date: "2021-06-20",
          range: "1-9",
        },
      };

      const response = await axios.request(options);
      try {
        const returned = await response.data;
        setHomePopularAlbums(formatBillboardAlbum(returned.content));
      } catch (err) {
        console.log(err);
      }
    };

    // db.ref(`users/${user.uid}/favSongs`).on("value", (snapshot) => {
    //   console.log(snapshot.val());
    // const dbUser = { uid: user.uid, ...snapshot.val() };
    // localStorage.setItem("currentUser", JSON.stringify(dbUser));
    // setUser(dbUser);
    // });

    // --------- FIREBASE USER LISTENER-----
    auth.onAuthStateChanged(user => {
      user
        ? db
            .ref(`users/${user.uid}`)
            .once("value")
            .then(snapshot => {
              const dbUser = { uid: user.uid, ...snapshot.val() };
              localStorage.setItem("currentUser", JSON.stringify(dbUser));
              setUser(dbUser);
            })
        : localStorage.removeItem("currentUser");
      setUser("");
    });

    getAfroBeats();
    getSongsUS();
    getSongsUK();
    getBillboardArtists();
    getBillboardAlbums();
  }, []);

  // ------------SEARCH QUERY FUNCTION -------------

  const getQuery = async query => {
    const options = {
      ...constOptions1,
      url: `${shazamBaseUrl}search`,
      params: {
        term: query,
        locale: "en-US",
        offset: "0",
        limit: "5",
      },
    };

    const response = await axios.request(options);
    try {
      const returned = await response.data;
      setSearchResult(formatSearchResult(returned));
      // console.log(searchResult)
    } catch (err) {
      console.log(err);
    }
  };

  // ------------GET SINGLE MUSIC DETAILS---------------

  const getMusic = async musicID => {
    const musicMemo = {};

    if (musicMemo[musicID]) {
      setMusic(musicMemo[musicID]);
    } else {
      const options = {
        ...constOptions1,
        url: `${shazamBaseUrl}songs/get-details`,
        params: {
          key: musicID,
          locale: "en-US",
        },
      };

      const response = await axios.request(options);
      try {
        const returned = await response.data;
        musicMemo[musicID] = formatSingleMusic(returned);
        setMusic(musicMemo[musicID]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // --------------GET ARTIST TOP TRACKS--------------

  const getArtistSongs = async artistID => {
    const options = {
      ...constOptions1,
      url: `${shazamBaseUrl}songs/list-artist-top-tracks`,
      params: {
        id: artistID,
        locale: "en-US",
      },
    };

    const response = await axios.request(options);
    try {
      const returned = await response.data;
      // console.log(returned.tracks);
      setArtistSongs(returned.tracks);
    } catch (err) {
      console.log(err);
    }
  };

  // -----------GET ARTIST IMAGES---------

  const getArtistImg = async query => {
    const options = {
      method: "GET",
      url: "https://genius.p.rapidapi.com/search",
      params: {
        q: query,
      },
      headers: {
        "x-rapidapi-key": apikey,
        "x-rapidapi-host": "genius.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    try {
      const returned = await response.data;
      console.log("it ran");
      const img = getImages(returned.response.hits, query);
      localStorage.setItem("images", JSON.stringify(img));

      // console.log(img);
      setImgArtist(img);
    } catch (err) {
      console.log(err);
    }
  };

  // -----------SIGN IN WITH GOOGLE-----------
  const doSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        result.additionalUserInfo.isNewUser &&
          db.ref(`users/${result.user.uid}`).set({
            username: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          });
      })
      .catch(err => console.log(err));
  };

  // ------SIGN OUT ----------

  const doSignOut = () => {
    auth.signOut();
  };

  // ---------UPDATE STATE ON CHANGE -----
  const updateFavState = () => {
    db.ref(`users/${user.uid}/favSongs`).on("value", snapshot => {
      const data = snapshot.val();
      console.log(data);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, favSongs: data })
      );
      setUser({ ...user, favSongs: data });
    });
  };

  return (
    <MusicContext.Provider
      value={{
        afro: [afroBeats],
        popularUS: [homePopularUS],
        popularUK: [homePopularUK],
        popularArtists: [homePopularArtists],
        popularAlbums: [homePopularAlbums],
        song: [music, setMusic],
        artistSong: [artistSongs, setArtistSongs],
        result: [searchResult, setSearchResult],
        search: [query, setQuery],
        img: [imgArtist, setImgArtist],
        currentUser: [user, setUser],
        doSignIn,
        doSignOut,
        updateFavState,
        getQuery,
        getMusic,
        getArtistImg,
        getArtistSongs,
        // getAlbum
      }}>
      {children}
    </MusicContext.Provider>
  );
};
