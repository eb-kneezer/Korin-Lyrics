import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import SingleMusic from "../../Components/SingleMusic/SingleMusic";
import styles from "./Artist.module.css";

import { MusicContext } from "../../context";

import defImg from "../../assets/hero2.jpg";

export default function Artist() {
  const { img, artistSong, getArtistSongs } = useContext(MusicContext);
  const [artistSongs, setArtistSongs] = artistSong;
  const [imgArtist] = img;

  const { artistID } = useParams();

  useEffect(() => {
    setArtistSongs([]);
    getArtistSongs(artistID); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistID]);

  if (!imgArtist) {
    return <LoadingPage />;
  }

  const { header_image_url, image_url, name } = imgArtist.result.primary_artist;

  return (
    <div>
      <div
        className={styles.artistHero}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.9)), url(${
            header_image_url ? header_image_url : defImg
          }) `,
          backgroundPosition: "top",
          backgroundSize: "contain",
        }}>
        <div className={styles.container}>
          <div className={styles.heroTop}>
            <div className={styles.artistImage}>
              <img src={image_url ? image_url : defImg} alt='' />
            </div>
            <div className={styles.artistDetails}>
              <h1>{name ? name : "Artist Name"}</h1>
              <h3>Genre</h3>
            </div>
          </div>

          <div className={styles.heroBottom}>
            <div className={styles.socials}></div>
          </div>
        </div>
      </div>

      <div className={styles.artistSongs}>
        <div className={styles.container}>
          <h1 className={styles.artistSongsHeader}>Top Songs by Artist</h1>
          <div className={styles.artistItems}>
            {artistSongs.length > 0 ? (
              artistSongs
                .slice(0, 14)
                .map(item => (
                  <SingleMusic
                    key={item.key}
                    songID={item.key}
                    title={item.title}
                    artist={item.subtitle}
                    image={item.images.coverarthq}
                    artistID={item.artists[0].id}
                  />
                ))
            ) : (
              <Loading type='song' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
