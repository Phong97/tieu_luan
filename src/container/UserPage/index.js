import React from 'react';
import './style.scss';
import Item from '../../component/ItemPostUserPage';
import MCard from '../../component/MCard';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      all_post: '',
      selected: ''
    }
    this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }
  loadBookmark = () => {
    const userid = localStorage.getItem('userid');
    axios.post('http://localhost:3001/user/user_bookmark', { userid }).then(res => {
      const all = res.data[0];
      console.log(res);
      const all_post = all.map(post => {
        return <MCard data={post} position="right" />;
      });
      this.setState({ all_post: all_post, selected: '' });
    });
  }
  loadData = () => {
    const userid = localStorage.getItem('userid');
    axios.post('http://localhost:3001/user/user_id_post', { userid }).then(res => {
      const all = res.data[0];
      const all_post = all.map(post => {
        return <Item handlePublish={this.handlePublish} handleSelectedDelete={this.handleSelectedDelete} data={post} />;
      });
      this.setState({ all_post: all_post, selected: '' });
    });
  }
  handlePost = () => {
    this.loadData();
  }
  handleBookmark = () => {
    this.loadBookmark();
  }
  componentDidMount() {
    const userid = localStorage.getItem('userid');
    axios.post('http://localhost:3001/user/user_id', { userid }).then(res => this.setState({ profile: res.data[0][0] }));
    this.loadData();
  }
  handlePublish = (id) => {
    axios.post('http://localhost:3001/post/publish', { id }).then(
      res => {
        this.loadData();
        alert('Publish success!');
      });
  }
  handleSelectedDelete = (id) => {
    this.setState({ selected: id });
  }
  handleDeletePost = () => {
    const postid = this.state.selected;
    axios.post('http://localhost:3001/post/delete', { postid }).then(
      res => {
        this.loadData();
        alert('Delete success!');
      });
  }
  render() {
    const { profile, all_post } = this.state;
    let avatar = "http://placehold.it/80x80";
    let name = "";
    if (profile) {
      avatar = profile.avartar ? profile.avartar : "http://placehold.it/80x80";
      name = profile.name;
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
              <div class="left-more">
                <a onClick={this.handlePost} className="font-weight-600">Post</a>&nbsp;&nbsp;
                <a onClick={this.handleBookmark} className="font-weight-600">Bookmark</a>
              </div>
              <a href="/user/new" className="right-more font-weight-400">New post</a>
            </div>
          </div>
          <hr className="divider" />
          {all_post}
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
                <button onClick={this.handleDeletePost} type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
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
