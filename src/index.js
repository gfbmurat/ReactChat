import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/reducers/store'
import 'semantic-ui-css/semantic.min.css'
import firebase from './firebase';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/auth/PrivateRoute';
import UserList from './components/UserList';
import App from './App';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import UserPanel from './components/UserPanel/UserPanel';
import Profile from './components/auth/Profile';

const rrfConfig = {
  userProfile: 'users',
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

const Root = () => {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //Login olmuş
        history.push("/")
      } else {
        //Login olmamış
        history.push("/login")
      }
    })
  }, [history])
  return (
    <div>
      {/* <Nav /> */}
      <Switch>
        <PrivateRoute exact path="/">
          <App />
        </PrivateRoute>
        <Route exact path="/login" component={Login} />
        <Route exact path="/userlist" component={UserList} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/logout">
          <UserPanel />
        </PrivateRoute>
        {/* <Route exact path="/logout" component={UserPanel} /> */}
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Root />
      </ReactReduxFirebaseProvider>
    </Provider>
  </Router>
  ,
  document.getElementById('root')
);