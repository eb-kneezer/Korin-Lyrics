import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { MusicContext } from "../../context";

import styles from "./NavHeader.module.css";

export default function NavHeader() {
  const { doSignIn, doSignOut, currentUser } = useContext(MusicContext);
  const [user] = currentUser;

  return (
    <nav>
      <div>
        <Link className={styles.logo} to="/">
          <span>KORIN</span>
        </Link>
      </div>
      <ul className={styles.navlinks}>
        <Link className={styles.links} to="/artist">
          Popular
        </Link>
        <Link className={styles.links} to="/song">
          Charts
        </Link>
      </ul>
      {user ? (
        <div className={styles.navauth}>
          <div className={styles.authprofile}>
            <div className={styles.profiletext}>
              <h4>{user.username}</h4>
              <p>{user.email}</p>
            </div>
            <div className={styles.profileimg}>
              <img src={user.photo} alt={user.username} />
            </div>
          </div>
          <button onClick={doSignOut}>SIGN OUT</button>
        </div>
      ) : (
        <div className={styles.navauth}>
          <button onClick={doSignIn}>LOG IN</button>
        </div>
      )}
    </nav>
  );
}
