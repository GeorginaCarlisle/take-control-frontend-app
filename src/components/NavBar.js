import React from 'react'
import { NavLink } from "react-router-dom"
import styles from '../styles/NavBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.Header}>
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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink className={styles.Link} activeClassName={styles.Active} to="/about">About</NavLink>
          <NavLink className={styles.Link} activeClassName={styles.Active} to="/signup">Sign Up</NavLink>
          <NavLink className={styles.Link} activeClassName={styles.Active} to="/signin">Sign In</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar