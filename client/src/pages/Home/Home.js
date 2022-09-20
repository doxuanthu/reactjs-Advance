import React from "react";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import styles from "./Home.module.scss";

const cx = className.bind(styles);
function Home() {
  return (
    <div className={cx("wrapper")}>
      <Link to="/exercise1" className={cx("exercise")}>
        Exercise 01
      </Link>
      <Link to="/store" className={cx("exercise")}>
        Exercise 02
      </Link>
    </div>
  );
}

export default Home;
