import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import site_state from './state/reducers.js';

import Home from "./pages/Home.jsx";
import Education from "./pages/Education.jsx";
import Miscellaneous from "./pages/Miscellaneous.jsx";
import About from "./pages/About.jsx";
import More from "./pages/More.jsx";
import Skills from "./pages/Skills.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

let dark_mode_initial = new Date().getHours() >= 21 || new Date().getHours() <= 8 ? true : false;
const store = createStore(
    site_state, // reducers
    {
      dark_mode: dark_mode_initial
    }
);


ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter >
          <div id="content-main">
              <Route exact path="/*" render={(props) => <Navbar {...props} /> } />
              <Route exact path="/" render={(props) => <Home {...props} /> } />
              <Route exact path="/education" render={(props) => <Education {...props} /> } />
              <Route exact path="/miscellaneous" render={(props) => <Miscellaneous {...props} /> } />
              <Route exact path="/about" render={(props) => <About {...props} /> } />
              <Redirect from='/index.html' to="/" />
              {/* <Route exact path="/skills" render={(props) => <Skills {...props} /> } /> */}
              {/* <Route exact path="/more" render={(props) => <More {...props} /> } /> */}
              {/* <Route exact path="/*" render={(props) => <Footer {...props} /> } /> */}

          </div>
          <Route exact path="/*" render={(props) => <Footer {...props} /> } />
      </BrowserRouter >
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister(); default
serviceWorker.unregister();
