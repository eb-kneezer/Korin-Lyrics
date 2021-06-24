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
  const [imgArtist, setImgArtist] = useState({});
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
          date: "2021-05-20",
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
          date: "2021-05-20",
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

    db.ref(`users/${user.uid}/favSongs`).on("value", (snapshot) => {
      console.log(snapshot.val());
      // const dbUser = { uid: user.uid, ...snapshot.val() };
      // localStorage.setItem("currentUser", JSON.stringify(dbUser));
      // setUser(dbUser);
    });

    // --------- FIREBASE USER LISTENER-----
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref(`users/${user.uid}`)
          .once("value")
          .then((snapshot) => {
            const dbUser = { uid: user.uid, ...snapshot.val() };
            localStorage.setItem("currentUser", JSON.stringify(dbUser));
            setUser(dbUser);
          });
      } else {
        localStorage.removeItem("currentUser");
        setUser("");
      }
    });

    getAfroBeats();
    // getSongsUS()
    // getSongsUK()
    // getBillboardArtists()
    // getBillboardAlbums()
  }, []);

  // ------------SEARCH QUERY FUNCTION -------------

  const getQuery = async (query) => {
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

  const getMusic = async (musicID) => {
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
      setMusic(formatSingleMusic(returned));
    } catch (err) {
      console.log(err);
    }
  };

  // --------------GET ARTIST TOP TRACKS--------------

  const getArtistSongs = async (artistID) => {
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
      setArtistSongs(returned.tracks);
    } catch (err) {
      console.log(err);
    }
  };

  // -----------GET ARTIST IMAGES---------

  const getArtistImg = async (query) => {
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
      setImgArtist(getImages(returned.response.hits, query));
    } catch (err) {
      console.log(err);
    }
  };

  // -----------SIGN IN WITH GOOGLE-----------
  const doSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        return db.ref(`users/${result.user.uid}`).set({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          favSongs: { init: "000" },
          favArtist: { init: "000" },
        });
      })
      .catch((err) => console.log(err));
  };

  // ------SIGN OUT ----------

  const doSignOut = () => {
    auth.signOut();
  };

  // -------ADD FAVORITE ---------

  // const addToFave = (songID, title) => {
  //   if (user) {
  //     const newData = { ...user.favSongs, [title]: songID };

  //     db.ref(`users/${user.uid}`).child("favSongs").update(newData);
  //   }
  // };
  // user.uid, songID, "favSongs";
  // userID, id, type;

  // .then(() => {
  // });
  // }
  // .then(() => {
  // db.ref(`users/${user.uid}`).once("value");
  // .then((snapshot) => {
  //   const dbUser = { uid: user.uid, ...snapshot.val() };
  //   localStorage.setItem("currentUser", JSON.stringify(dbUser));
  //   setUser(dbUser);
  // });
  // });

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
        // addToFave,
        getQuery,
        getMusic,
        getArtistImg,
        getArtistSongs,
        // getAlbum
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
