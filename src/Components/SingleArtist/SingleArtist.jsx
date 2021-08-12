import React, { useContext } from "react";

import styles from "./SingleArtist.module.css";
import img from "../../assets/artist.svg";
import { Link } from "react-router-dom";
import { MusicContext } from "../../context";

export default function SingleArtist({
  artist,
  image = null,
  artistID = null,
}) {
  const { getArtistImg } = useContext(MusicContext);

  return (
    <Link
      className={styles.singleLink}
      to={`/artist/${artistID}`}
      onClick={() => getArtistImg(artist)}>
      <div className={styles.singleArtist}>
        <img
          loading='lazy'
          className={styles.artistImg}
          src={image ? image : img}
          alt='artist'
        />
        <h4 id={artistID}>{artist}</h4>
      </div>
    </Link>
  );
}
