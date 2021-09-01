import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./Song.module.css";
import Loading from "../../Components/Loading/Loading";

import { MusicContext } from "../../context";
import SingleMusic from "../../Components/SingleMusic/SingleMusic";

import LoadingPage from "../../Components/LoadingPage/LoadingPage";
export default function Song() {
  const { popularUS, popularUK, song, getMusic } = useContext(MusicContext);
  const [homePopularUS] = popularUS;
  const [homePopularUK] = popularUK;
  const [music, setMusic] = song;

  const youtubeID = music && music.youtubeURL.split("/")[3].split("?")[0];

  const { musicID } = useParams();

  useEffect(() => {
    setMusic(null);
    getMusic(musicID); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicID]);

  if (!music) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.container}>
      <section className={styles.songInfo}>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7)), url(${music.coverImg}) `,
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
          className={styles.songCover}>
          <div className={styles.songTitle}>
            <h1>{music.title}</h1>
            <h3>{music.artist}</h3>
          </div>
        </div>
        <div className={styles.songDetails}>
          <p>
            Genre: <strong>{music.genre}</strong>
            <br />
            Album: <strong>{music.album}</strong>
            <br />
            Released: <strong>{music.released}</strong>
            <br />
            Label: <strong>{music.label}</strong>
          </p>
        </div>
      </section>

      <section className={styles.songLyrics}>
        <div className={styles.lyricsInfo}>
          <h2>{music.title}</h2>
          <em>hint: get in the shower, you'll sound better</em>
        </div>
        <hr />
        <div className={styles.lyricsBody}>
          <div className={styles.lyricsContainer}>
            <p>{music.lyrics}</p>
          </div>
          <div className={styles.lyricsFooter}>
            <p>
              <em> {music.footer}</em>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.popSong}>
        <iframe
          title='{music.youtubeCaption}'
          style={{
            width: "350px",
            height: "198px",
            border: "none",
          }}
          frameBorder='0'
          src={`https://youtube.com/embed/${youtubeID}`}></iframe>
        <div className={styles.popSongs}>
          <h3>Popular songs</h3>
          <div className={styles.popSongsContainer}>
            {homePopularUS.length > 0 && homePopularUK.length > 0 ? (
              [...homePopularUK].map(item => (
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
      </section>
    </div>
  );
}
