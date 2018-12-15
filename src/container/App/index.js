import React from 'react';
import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Header from '../../container/Header';
import Post from '../../container/Post';
import HomePage from '../../container/HomePage';
import NotFoundPage from '../../component/NotFoundPage';
import CatogoryPage from '../../container/CatogoryPage';
import UserPage from '../../container/UserPage';
import EditProfile from '../../container/EditProfile';
import NewPost from '../../container/NewPost';
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
      <Route path='/Post/:id' component={Post} />
      <Route path='/Catogory/:id' component={CatogoryPage} />
      <Route exact path='/user/edit' component={EditProfile}/>
      <Route exact path='/user/new' component={NewPost}/>
      <Route path='/user' component={UserPage}/>
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);
export default App;
