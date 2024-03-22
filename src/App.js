import { Route,Switch } from 'react-router-dom';
import './api/axiosDefaults';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser } from './contexts/CurrentUserContext';
import styles from './App.module.css';
import toastStyles from './styles/Toast.module.css';
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
import { Toast } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function App() {

  const currentUser = useCurrentUser();

  const [showGlobalSuccess, setShowGlobalSuccess] = useState(false);

  const [globalSuccessMessage, setGlobalSuccessMessage] = useState("");

  useEffect(() => {
    // Closes the toast automatically after 8 seconds
    if (showGlobalSuccess) {
      const hideToast = () => {
        setShowGlobalSuccess(false);
        setGlobalSuccessMessage("");
      }
      const timer = setTimeout(() => {
        hideToast();
      }, 8000)
      // Below cleans up and clears the timeout function
      return () => {
        clearTimeout(timer)
      }
    }
  }, [showGlobalSuccess])

  const handleHide = () => {
    setShowGlobalSuccess(false);
    setGlobalSuccessMessage("");
  }

  return (
    <div className={styles.App}>
      <NavBar />
      <Toast show={showGlobalSuccess} onClose={handleHide} className={toastStyles.Toast}>
        <Toast.Header className={toastStyles.Header}>
          <strong className={toastStyles.Title}>Success !!</strong>
        </Toast.Header>
        <Toast.Body>{globalSuccessMessage}Heloo hello lets put some text in here</Toast.Body>
      </Toast>
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/signup" render={() => <Signup setShowGlobalSuccess={setShowGlobalSuccess} setGlobalSuccessMessage={setGlobalSuccessMessage}/>} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/plan" render={() => (
            currentUser ? ( <Plan /> ) : ( <Redirect to={{pathname: "/signin"}} />)
          )} />
          <Route exact path="/miscellaneous" render={() => (
            currentUser ? ( <Miscellaneous /> ) : ( <Redirect to={{pathname: "/signin"}} />)
          )} />
          <Route exact path="/focus/create" render={() => (
            currentUser ? ( <FocusCreate /> ) : ( <Redirect to={{pathname: "/signin"}} />)
          )} />
          <Route exact path="/focus/:id" render={() => (
            currentUser ? ( <Focus /> ) : ( <Redirect to={{pathname: "/signin"}} />)
          )} />
          <Route exact path="/takeaction" render={() => (
            currentUser ? ( <TakeAction /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
          <Route render={() => <NotFound />} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;