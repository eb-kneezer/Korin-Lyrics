import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home/Home'
import Song from './Pages/Song/Song'
import Artist from './Pages/Artist/Artist'
import Album from './Pages/Album/Album'
import NavHeader from './Components/NavHeader/NavHeader';
import Footer from './Components/Footer/Footer';
import { MusicContext } from './context';
import Search from './Components/Search/Search';

function App() {

  const [homePopularUS, setHomePopularUS] = useState([])
  const [homePopularUK, setHomePopularUK] = useState([])
  const [homePopularArtists, setHomePopularArtists] = useState([])
  const [homePopularAlbums, setHomePopularAlbums] = useState([])
  const [music, setMusic] = useState({})
  const [artist, setArtist] = useState({})
  const [query, setQuery] = useState('');


  return (
    <div className="App">
      <NavHeader />
      <MusicContext.Provider value={{
        popularUS: [homePopularUS, setHomePopularUS],
        popularUK: [homePopularUK, setHomePopularUK],
        popularArtists: [homePopularArtists, setHomePopularArtists],
        popularAlbums: [homePopularAlbums, setHomePopularAlbums],
        music: [music, setMusic],
        artist: [artist, setArtist],
        query: [query, setQuery]
      }}>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/song' component={Song} />
          <Route path='/artist' component={Artist} />
          <Route path='/album' component={Album} />
        </Switch>
        <Search />
      </MusicContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
