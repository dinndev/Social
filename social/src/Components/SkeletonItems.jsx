import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "./Styles/Sass/skeletonItems.scss";

function SkeletonItems() {
  return (
    <SkeletonTheme highlightColor={"#C4C4C4"}>
      <div className="App">
        <div className="profileContainer">
          <Skeleton className={styles} height={90} circle={true} width={90} />
          <div className="userInfo">
            <span className="displayName">
              <Skeleton height={30} width={150} />
            </span>
            <br />
            <span className="email">
              <Skeleton height={30} width={150} />
            </span>
            <span className="fill"></span>
          </div>
        </div>
        <ul className="posts">
          <li className="post">
            <div className="postUserInfo">
              <div className="user">
                <Skeleton
                  className="postPic"
                  height={30}
                  circle={true}
                  width={30}
                />
                <span>
                  <Skeleton className="postName" height={15} width={200} />
                  <br />
                  <span className="postEmail">
                    <Skeleton height={10} width={200} />
                  </span>
                </span>
              </div>
            </div>
            <div className="postContainer">
              <Skeleton height={10} width={280} />
              <Skeleton height={10} width={280} />
              <Skeleton height={10} width={280} />
            </div>
          </li>
        </ul>
      </div>
    </SkeletonTheme>
  );
}

export default SkeletonItems;
