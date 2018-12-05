import React from 'react';
import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Header from '../../component/Header';
import Menu from '../../component/Menu'
import './style.scss';

const App = () => (
  <div className="body">
    <Helmet
      titleTemplate="Medium"
      defaultTitle="Medium"
    >
      <meta name="description" content="Medium" />
    </Helmet>
    <Header />
    <Menu />
    <Switch>
      {/* <Route exact path='/' component={Home} />
      <Route path='/About' component={About} /> */}
    </Switch>
  </div>
);
export default App;
