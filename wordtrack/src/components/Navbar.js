import React from "react";
import { Outlet, Link } from "react-router-dom";

const navStyles = {
  container: {
    display: "flex",
    // position: "absolute",
    flexDirection: "row",
    height: 60,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
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
    cursor: "pointer",
  },
  loggedInAs: {
    position: "absolute",
    right: "5px",
    left: "auto",
    fontWeight: "500",
    fontSize: "medium",
  }
};

const Navbar = ({ userEmail, setUserEmail }) => {
  const signOut = () => {
    setUserEmail(null);
    sessionStorage.removeItem("userEmail");
  };
  return (
    <div>
      <div style={navStyles.container}>
        <h1 style={navStyles.title}>
          <li style={navStyles.listItem}>
            <Link style={navStyles.link} to="/">
              WordTrack
            </Link>
          </li>
        </h1>
        <ul style={navStyles.list}>
          <li style={navStyles.listItem}>
            <Link style={navStyles.link} to="/">
              Home
            </Link>
          </li>
          <li style={navStyles.listItem}>
            <Link style={navStyles.link} to="/profile">
              Profile
            </Link>
          </li>
          <li style={navStyles.listItem}>
            {userEmail ? (
              <a style={navStyles.link} onClick={signOut}>
                Sign Out
              </a>
            ) : (
              <Link style={navStyles.link} to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
        <h2 style={navStyles.loggedInAs}>
          {userEmail ? `Logged in as ${userEmail}` : "No user found"}
        </h2>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
