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
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser } from './api/contexts/CurrentUserContext';
import TakeAction from './pages/action/TakeAction';
import Labels from './pages/labels/Labels';
import Profile from './pages/profile/Profile';

function App() {

  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/signin" render={() => <SignIn />} />

          <Route exact path="/plan" render={() => (
            currentUser ? ( <Plan /> ) : ( <Redirect to={{pathname: "/signin"}} />)
          )} />

          <Route exact path="/takeaction" render={() => (
            currentUser ? ( <TakeAction /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
          <Route exact path="/labels" render={() => (
            currentUser ? ( <Labels /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
          <Route exact path="/profile" render={() => (
            currentUser ? ( <Profile /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;