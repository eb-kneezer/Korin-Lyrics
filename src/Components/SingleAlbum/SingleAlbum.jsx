import React from "react";

import styles from "./SingleAlbum.module.css";
import img from "../../assets/album.svg";

export default function SingleAlbum({ artist, title }) {
  return (
    <div className={styles.singleAlbum}>
      <img loading='lazy' className={styles.albumImg} src={img} alt='album' />
      <div className={styles.albumInfo}>
        <h4>{title}</h4>
        <p>{artist}</p>
      </div>
    </div>
  );
}
