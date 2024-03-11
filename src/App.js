import React from 'react';
import { Route,Switch } from 'react-router-dom';
import './api/axiosDefaults';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/auth/Signup';
import SignIn from './pages/auth/SignIn';
import Plan from './pages/plan/Plan';

function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/plan" render={() => <Plan />} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;