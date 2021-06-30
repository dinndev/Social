import React from "react";
import styles from "./Styles/Sass/EmptyPost.module.scss";

function EmptyPost() {
  return (
    <div className={styles.emptypostContainer}>
      <h1 className={styles.emptyPost}>Post Something!</h1>
    </div>
  );
}

export default EmptyPost;
