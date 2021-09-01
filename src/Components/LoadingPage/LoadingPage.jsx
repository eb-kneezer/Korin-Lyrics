import React from "react";
import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.loadingText}>
        <h1>KORIN</h1>
        <p>loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
