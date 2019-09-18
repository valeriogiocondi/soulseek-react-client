'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import allReducers from './structure/redux/reducers/allReducers'
import * as serviceWorker from './serviceWorker';

import PrivateComponent from './structure/modules/_PrivateComponent/PrivateComponent';
import Home from './structure/modules/Home/Home';
import Login from './structure/modules/Login/Login';
import Logout from './structure/modules/Logout/Logout';
import Search from './structure/modules/Search/Search';
import ProfiloUtente from './structure/modules/ProfiloUtente/ProfiloUtente';
import Page404 from './structure/modules/Page404/Page404';
import './index.css';

const store = createStore(allReducers);

const Index = ({ store }) => (
  <Provider store={store}>
    <Router>
  		<Switch>
      	<Route path="/login" component={Login} />
      	<PrivateComponent exact path="/" component={Home} />
      	<PrivateComponent exact path="/search" component={Home} />
      	<PrivateComponent exact path="/search/:keyword" component={Search} />
      	<Route path="/logout" component={Logout} />
      	<Route exact path="/utente" component={Home} />
      	<Route path="/utente/:id" component={Home} />
      	<Route component={Page404} />
  		</Switch>
    </Router>
  </Provider>
)

ReactDOM.render(<Index store={store} />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
