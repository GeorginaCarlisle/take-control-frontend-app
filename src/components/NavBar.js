import React from 'react'
import styles from '../styles/NavBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.Header}>
      <div className={styles.LogoContainer}>
          <img
              src={logo}
              alt="Take control logo. A green decagon made of intersecting lines"
              className={styles.Logo}/>
          <div>
          <h2 className={styles.LogoName}>Take Control</h2>
          </div>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>About</Nav.Link>
          <Nav.Link>Signup</Nav.Link>
          <Nav.Link>Signin</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar