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
    name: ''
  }
  componentDidMount() {
    const id = window.location.href.split('/')[4];
    axios.post('http://localhost:3001/post/load_post', { id }).then(res => {
      const { title, des, content, time, name } = res.data[0][0];
      console.log(res.data[0])
      this.setState({ title, des, content, time, name });
    })
  }
  render() {
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
          <h1 class="main-title font-weight-600" dangerouslySetInnerHTML={{__html: title}}></h1>
          <div class="profile">
            <a>
              <img src="http://placehold.it/80x80" alt="" />
            </a>
            <span>{name}</span>
            <a class="button">Follow</a>
            <br /><span class="date">{time}</span>
          </div>
          <div className="content-post" dangerouslySetInnerHTML={{__html: content}}>
          </div>
          <div class="profile">
            <a>
              <img src="https://image.flaticon.com/icons/svg/511/511213.svg" alt="" />
            </a>
            <span>140 claps</span>
            <i class="far fa-bookmark" data-toggle="tooltip" data-placement="bottom" title="Bookmark this story to read later"></i>
          </div>
          <hr className="divider" />
          <div class="profile">
            <a>
              <img src="http://placehold.it/80x80" alt="" />
            </a>
            <span>{name}</span>
            <a class="button">Follow</a>
          </div>
          <div className="row other-post">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <LRCard position="right" />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <LRCard position="right" />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <LRCard position="right" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
