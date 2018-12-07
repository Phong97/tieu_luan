import React from 'react';
import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Header from '../../container/Header';
import Post from '../../component/Post';
import HomePage from '../../container/HomePage';
import NotFoundPage from '../../component/NotFoundPage';
import './style.scss';

const App = () => (
  <div className="App">
    <Helmet
      titleTemplate="Medium"
      defaultTitle="Medium"
    >
      <meta name="description" content="Medium" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/Post' component={Post} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);
export default App;
