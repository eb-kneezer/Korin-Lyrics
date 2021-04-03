import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home/Home'
import SearchResult from './Pages/SearchResult/SearchResult'
import Song from './Pages/Song/Song'
import Artist from './Pages/Artist/Artist'
import Album from './Pages/Album/Album'
import NavHeader from './Components/NavHeader/NavHeader';
import Footer from './Components/Footer/Footer';
// import { MusicContext } from './context';
import { MusicContextProvider } from './context';
import Search from './Components/Search/Search';

function App() {

  return (
    <div className="App">
      <NavHeader />
      <MusicContextProvider>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/search/:queryID' component={SearchResult} />
          <Route path='/song/:musicID' component={Song} />
          <Route path='/artist/:artistID' component={Artist} />
          <Route path='/album/:albumID' component={Album} />
        </Switch>
        <Search />
      </MusicContextProvider>
      <Footer />
    </div>
  );
}

export default App;
