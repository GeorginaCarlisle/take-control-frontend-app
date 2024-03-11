import React from 'react'
import { NavLink } from "react-router-dom"
import styles from '../styles/NavBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';

const NavBar = () => {

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignout = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch(err) {
      console.log(err)
    }
  }
  const loggedInLinks = (
    <>
      <NavLink className={styles.Link} activeClassName={styles.Active} to="/plan">Plan</NavLink>
      <NavLink className={styles.Link} activeClassName={styles.Active} to="/takeaction">Take Action</NavLink>
      <NavLink className={styles.Link} activeClassName={styles.Active} to="/labels">Labels</NavLink>
      <NavLink className={styles.Link} activeClassName={styles.Active} to="/profile">Profile</NavLink>
      <NavLink className={styles.Link} onClick={handleSignout} to="/" >Signout</NavLink>
    </>
  );

  const loggedOutLinks = (
    <>
      <NavLink className={styles.Link} activeClassName={styles.Active} to="/about">About</NavLink>
      <NavLink className={styles.Link} activeClassName={styles.Active} to="/signup">Sign Up</NavLink>
      <NavLink className={styles.Link} activeClassName={styles.Active} to="/signin">Sign In</NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} expand="md" fixed="top" className={styles.Header}>
      <NavLink to="/">
        <div className={styles.LogoContainer}>
            <img
                src={logo}
                alt="Take control logo. A green decagon made of intersecting lines"
                className={styles.Logo}/>
            <div>
            <h2 className={styles.LogoName}>Take Control</h2>
            </div>
        </div>
      </NavLink>
      <Navbar.Toggle
        ref={ref}
        onClick={() => setExpanded(!expanded)}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav" className={styles.DesktopLinks}>
        <Nav className={styles.NavLinks}>
          {currentUser ? (loggedInLinks) : (loggedOutLinks)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar