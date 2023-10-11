import React from "react";
import { Outlet, Link } from "react-router-dom";

/**
 * Layout page includes navbar. -N
 */

const navStyles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    width: "100vw",
    alignItems: "center",
    //paddingLeft: 20,
  },
  title: {
    paddingLeft: 20,
  },
  list: {
    display: "flex",
    flexDirection: "row",
  },
  listItem: {
    listStylePosition: "inside",
    listStyleType: "none",
    margin: 0,
    padding: 20,
  },
  link: {
    textDecoration: "none",
    color: "Black",
  }
};

const Layout = () => {
  return (
    <div>
      <div style={navStyles.container}>
        <h1 style={navStyles.title}>
          <li style={navStyles.listItem}>
            <Link style={navStyles.link} to="/">WordTrack</Link>
          </li>
        </h1>
        <ul style={navStyles.list}>
          <li style={navStyles.listItem}>
            <Link style={navStyles.link}  to="/">Home</Link>
          </li>
          <li style={navStyles.listItem}>
            <Link style={navStyles.link}  to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
