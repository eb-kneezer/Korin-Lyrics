import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./SingleMusic.module.css";
import fave from "../../assets/favorite.svg";
import faveCheck from "../../assets/favorite-check.svg";
import { MusicContext } from "../../context";

import { db } from "../../firebase";

export default function SingleMusic({
  title,
  artist,
  image,
  songID,
  artistID,
}) {
  const { currentUser } = useContext(MusicContext);
  const [user] = currentUser;

  // const addToFave = (songID) => {
  //   console.log("updated");
  //   // doSOmething
  //   if (user) {

  //   }
  // };
  // const addToFave = (songID, title) => {
  //   if (user) {
  //     const newData = { ...user.favSongs, [title]: songID };

  //     db.ref(`users/${user.uid}`).child("favSongs").update(newData);
  //   }
  // };

  return (
    <div className={styles.singleMusic}>
      <Link className={styles.singleLink} to={`/song/${songID}`}>
        <img className={styles.singleImg} src={image} alt="music" />
      </Link>
      <div className={styles.musicInfo}>
        <p className={styles.title}>{title}</p>
        <p id={artistID}>{artist}</p>
        <div
          className={styles.faved}
          // onClick={(songID, title) => {
          //   if (user) {
          //     let newData = { ...user.favSongs, [title]: songID };
          //     let newPostKey = db
          //       .ref()
          //       .child("users/" + user.id + "/favSongs")
          //       .push().key;

          //     console.log(newPostKey);

          //     let updates = {};
          //     // updates['/users/' + newPostKey] = newData;
          //     updates[
          //       "users/" + user.uid + "/favSongs/" + "Mcyvhj5HTcUndY9Jyq"
          //     ] = newData;

          //     return db.ref().update(updates);

          //     // db.ref(`users/${user.uid}/favSongs`).set(newData);
          //   }
          // }}
        >
          <img src={fave} alt="fave" />
        </div>
      </div>
    </div>
  );
}
