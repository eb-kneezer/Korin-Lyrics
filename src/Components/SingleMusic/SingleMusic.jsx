import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./SingleMusic.module.css";
import fave from "../../assets/favorite.svg";
import faveCheck from "../../assets/favorite-check.svg";
import { MusicContext } from "../../context";

import { db } from "../../firebase";
import { shortenText } from "../../utilities";

export default function SingleMusic({
  title,
  artist,
  image,
  songID,
  artistID,
}) {
  const { currentUser, updateFavState } = useContext(MusicContext);
  const [user] = currentUser;

  return (
    <div className={styles.singleMusic}>
      <Link className={styles.singleLink} to={`/song/${songID}`}>
        <img
          loading='lazy'
          className={styles.singleImg}
          src={image}
          alt='music'
        />
      </Link>
      <div className={styles.musicInfo}>
        <div className={styles.musicText}>
          <p className={styles.title}>{shortenText(title)}</p>
          <p id={artistID}>{shortenText(artist)}</p>
        </div>
        <div
          className={styles.faved}
          onClick={() => {
            user
              ? db
                  .ref(`users/${user.uid}/favSongs/`)
                  .update({
                    [title.replace(/[^a-zA-Z0-9]/g, "")]: songID,
                  })
                  .then(() => {
                    updateFavState();
                  })
              : alert("you have to be logged in.");
          }}>
          <img
            loading='lazy'
            src={
              !user
                ? fave
                : Object.values(user.favSongs).includes(songID)
                ? faveCheck
                : fave
            }
            alt='fave'
          />
        </div>
      </div>
    </div>
  );
}
