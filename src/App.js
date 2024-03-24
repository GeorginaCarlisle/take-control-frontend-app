import { Route,Switch } from 'react-router-dom';
import './api/axiosDefaults';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/auth/Signup';
import SignIn from './pages/auth/SignIn';
import Plan from './pages/plan/Plan';
import TakeAction from './pages/action/TakeAction';
import Focus from './pages/focus/Focus';
import FocusCreate from './pages/focus/FocusCreate';
import Miscellaneous from './pages/plan/Miscellaneous';
import NotFound from './pages/NotFound';
import SuccessToast from './components/SuccessToast';
import { useEffect, useState } from 'react';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {

  const currentUser = useCurrentUser();
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [tokensChecked, setTokensChecked] = useState(false);

  useEffect(() => {
    const checkTokens = () => {
      const refreshTokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
      if (refreshTokenTimestamp) {
        setAuthenticatedUser(true);
      } else {
        setAuthenticatedUser(false);
      }
      setTokensChecked(true);
    };
    checkTokens();
  }, [currentUser])

  return (
    <div className={styles.App}>
      <NavBar />
      <SuccessToast />
        <div className={styles.Main}>
          {tokensChecked ? (
            <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/signin" render={() => <SignIn />} />
            <Route exact path="/plan" render={() => (
              authenticatedUser ? ( <Plan /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/miscellaneous" render={() => (
              authenticatedUser ? ( <Miscellaneous /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/focus/create" render={() => (
              authenticatedUser ? ( <FocusCreate /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/focus/:id" render={() => (
              authenticatedUser? ( <Focus /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/takeaction" render={() => (
              authenticatedUser ? ( <TakeAction /> ) : ( <Redirect to={{pathname: "/signin"}} />)
              )} />
            <Route render={() => <NotFound />} />
          </Switch>
          ) : (
            <div>
              Just checking authentication status ....
            </div>
          )}
        </div>
      <Footer />
    </div>
  );
}

export default App;