import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';
import LRCard from '../../component/LRCard';
import axios from 'axios';
class Post extends React.Component {
  state = {
    title: '',
    des: '',
    content: '',
    time: '',
    name: '',
    avartar: '',
    top5: '',
    clap: '',
    bookmark: ''
  }
  loadClap() {
    const postid = window.location.href.split('/')[4];
    axios.post('http://localhost:3001/post/post_clap', { postid }).then(res => this.setState({ clap: res.data[0][0].clap }));
  }
  componentDidMount() {
    axios.get('http://localhost:3001/post/newest').then(res => this.setState({ top5: res.data[0] }));
    const id = window.location.href.split('/')[4];
    const userid = localStorage.getItem('userid');
    axios.post('http://localhost:3001/post/load_post', { id }).then(res => {
      const { title, des, content, time, name, avartar } = res.data[0][0];
      this.loadClap();
      this.setState({ title, des, content, time, name, avartar });
    })
    if (userid) {
      axios.post('http://localhost:3001/user/check_bookmark', { postid: id, userid }).then(
        res => {
          if (res.data[0][0]) {
            this.setState({ bookmark: 'red' });
          }
        }
      );
    }
  }
  handleBookmark = () => {
    const postid = window.location.href.split('/')[4];
    const userid = localStorage.getItem('userid');
    console.log('handle bookmart');
    if (userid) {
      axios.post('http://localhost:3001/user/bookmark', { postid, userid }).then(
        res => {
          const state = res.data[0].state;
          if (state) {
            alert('Add BookMark Successful!');
            this.setState({ bookmark: 'red' });
          } else {
            alert('Remove BookMark Successful');
            this.setState({ bookmark: '' });
          }
        }
      );
    } else {
      alert('Please Login!');
    }
  }
  handleClap = () => {
    const postid = window.location.href.split('/')[4];
    const userid = localStorage.getItem('userid');
    if (userid) {
      axios.post('http://localhost:3001/post/clap', { postid, userid }).then(
        res => this.loadClap()
      );
    } else {
      alert('Please Login!');
    }
  }
  render() {
    const { top5, avartar, clap, bookmark } = this.state;
    const new1 = <LRCard data={top5[0]} position="right" />;
    const new2 = <LRCard data={top5[1]} position="right" />;
    const new3 = <LRCard data={top5[2]} position="right" />;
    const { title, content, time, name } = this.state;
    return (
      <div className="Post">
        <Helmet
          titleTemplate={`Medium-${title}`}
          defaultTitle={title}
        >
          <meta name="description" content={title} />
        </Helmet>
        <div class="container">
          <h1 class="main-title font-weight-600" dangerouslySetInnerHTML={{ __html: title }}></h1>
          <div class="profile">
            <a>
              <img src={avartar} alt="avatar" />
            </a>
            <span>{name}</span>
            <i onClick={this.handleBookmark} class={`far fa-bookmark ${bookmark}`} data-toggle="tooltip" data-placement="bottom" title="Bookmark this story to read later"></i>
            <br /><span class="date">{time}</span>
          </div>
          <div className="content-post" dangerouslySetInnerHTML={{ __html: content }}>
          </div>
          <div class="profile">
            <a onClick={this.handleClap}>
              <img src="https://image.flaticon.com/icons/svg/511/511213.svg" alt="" />
            </a>
            <span>{clap} claps</span>
            <i onClick={this.handleBookmark} class={`far fa-bookmark ${bookmark}`} data-toggle="tooltip" data-placement="bottom" title="Bookmark this story to read later"></i>
          </div>
          <hr className="divider" />
          <div class="profile">
            <a>
              <img src={avartar} alt="avatar" />
            </a>
            <span>{name}</span>
            <a class="button">Follow</a>
          </div>
          <div className="row other-post">
            <div className="col-sm-12 col-md-6 col-lg-4">
              {new1}
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              {new2}
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              {new3}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
