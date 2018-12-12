import React from 'react';
import './style.scss';
import MCard from '../../component/MCard';
import { Helmet } from 'react-helmet';

class UserPage extends React.PureComponent {


  render() {
    return (
      <div className="UserPage">
        <Helmet
          titleTemplate="Evan Freitas-Medium"
          defaultTitle="Evan Freitas-Medium"
        >
          <meta name="description" content="Medium" />
        </Helmet>
        <div class="profile">
          <a>
            <img src="http://placehold.it/80x80" alt="avatar" className="avatar" />
          </a>
          <div>
            <span className="font-weight-600 username">Evan Freitas</span>
            <a href='/user/edit' class="button">Edit profile</a>
          </div>
          <div className="follow font-weight-400">
            <a className="decoration"><span>15 Following</span></a>
            <a className="decoration"><span>15 Follower</span></a>
          </div>
          <br />
          <br />
          <div className="post">
            <div className="header-feature">
              <a className="left-more font-weight-600">Post</a>
              <a className="right-more font-weight-400">New post</a>
            </div>
          </div>
          <hr className="divider" />
          <MCard position="right" />
          <MCard position="right" />
          <MCard position="right" />
          <MCard position="right" />
          <MCard position="right" />
        </div>
      </div>
    );
  }
}

export default UserPage;
