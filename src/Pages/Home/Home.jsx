import React, { useContext } from "react";
import SingleAlbum from "../../Components/SingleAlbum/SingleAlbum";
import SingleArtist from "../../Components/SingleArtist/SingleArtist";
import SingleMusic from "../../Components/SingleMusic/SingleMusic";
import { MusicContext } from "../../context";

import styles from "./Home.module.css";
import Loading from "../../Components/Loading/Loading";
import Search from "../../Components/Search/Search";

export default function Home() {
  const {
    afro,
    popularUK,
    popularUS,
    popularArtists,
    popularAlbums,
    currentUser,
    doSignIn,
  } = useContext(MusicContext);
  const [afroBeats] = afro;
  const [homePopularUK] = popularUK;
  const [homePopularUS] = popularUS;
  const [homePopularArtists] = popularArtists;
  const [homePopularAlbums] = popularAlbums;
  const [user] = currentUser;

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroCta}>
            <h1>
              <span>Korin</span> along with your faves
            </h1>
            <h3>discover new music</h3>
            <Search />
          </div>
        </div>
      </section>

      <section className={styles.popmusic}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>AfroBeats</h2>
            </div>
            <div className={styles.popitems}>
              {afroBeats.length > 0 ? (
                afroBeats.map(item => (
                  <SingleMusic
                    key={item.key}
                    songID={item.key}
                    title={item.title}
                    artist={item.subtitle}
                    image={item.image}
                    artistID={item.artistId}
                  />
                ))
              ) : (
                <Loading type='song' />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.popmusic}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular in the US</h2>
            </div>
            <div className={styles.popitems}>
              {homePopularUS.length > 0 ? (
                homePopularUS.map(item => (
                  <SingleMusic
                    key={item.key}
                    songID={item.key}
                    title={item.title}
                    artist={item.subtitle}
                    image={item.image}
                    artistID={item.artistId}
                  />
                ))
              ) : (
                <Loading type='song' />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.popmusic}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular in the UK</h2>
            </div>
            <div className={styles.popitems}>
              {homePopularUK.length > 0 ? (
                homePopularUK.map(item => (
                  <SingleMusic
                    key={item.key}
                    songID={item.key}
                    title={item.title}
                    artist={item.subtitle}
                    image={item.image}
                    artistID={item.artistId}
                  />
                ))
              ) : (
                <Loading type='song' />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.popmusic}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Your favourites</h2>
            </div>
            {user ? null : (
              <div className={styles.favBox}>
                <div className={styles.favBoxIcons}></div>
                <div className={styles.favBoxText}>
                  <h2>Find lyrics to your favourites easily</h2>
                  <div className={styles.favBoxCta}>
                    <button onClick={doSignIn}>Log in</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.artists}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular artists</h2>
            </div>
            <div className={styles.popartists}>
              {homePopularArtists.length > 0 ? (
                homePopularArtists.map(item => (
                  <SingleArtist key={item.key} artist={item.artist} />
                ))
              ) : (
                <Loading type='artalb' />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.artists}>
        <div className={styles.container}>
          <div className={styles.popGroup}>
            <div className={styles.popHeader}>
              <h2>Popular albums</h2>
            </div>
            <div className={styles.popartists}>
              {homePopularAlbums.length > 0 ? (
                homePopularAlbums.map(item => (
                  <SingleAlbum
                    key={item.key}
                    title={item.album}
                    artist={item.artist}
                  />
                ))
              ) : (
                <Loading type='artalb' />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
