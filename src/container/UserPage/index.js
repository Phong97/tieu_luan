import React from 'react';
import './style.scss';
import Item from '../../component/ItemPostUserPage';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class UserPage extends React.PureComponent {
  state = {
    profile: ''
  }
  componentDidMount() {
    const userid = localStorage.getItem('userid');
    axios.post('http://localhost:3001/user/user_id', {userid}).then(res => this.setState({ profile: res.data[0][0]}));
  }
   render() {
     const {profile} = this.state;
     let avatar = "http://placehold.it/80x80";
     let name = "";
     if (profile) {
       avatar = profile.avartar ? profile.avartar : "http://placehold.it/80x80";
       name = profile.name;
       console.log(avatar);
     }
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
            <img src={avatar} alt="avatar" className="avatar" />
          </a>
          <div>
            <span className="font-weight-600 username">{name}</span>
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
              <a href="/user/new" className="right-more font-weight-400">New post</a>
            </div>
          </div>
          <hr className="divider" />
          <Item publish={false} />
          <Item publish={false} />
          <Item publish={false} />
          <Item publish={false} />
          <Item publish={false} />
        </div>
        <div class="modal" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Confirm Deletion</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to remove this post?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">OK</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
