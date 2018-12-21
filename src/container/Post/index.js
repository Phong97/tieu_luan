import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';
import LRCard from '../../component/LRCard';
import axios from 'axios';
var db;
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
    axios.get('http://localhost:3001/post/load_post/'+id+'/').then(res => {
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
  handleBookmarkwithSW=()=>{
    const postid = window.location.href.split('/')[4];
    const userid = localStorage.getItem('userid');
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
      //Dua xuong indexdb de bat dau dong bo
      var request = window.indexedDB.open("PostBookmark", 1);
      // var sel = this;
      request.onerror = function (event) {
        window.alert('index DB is wrong');
      };
      // nếu thành công
      request.onsuccess = function (event) {
        console.log("running onsuccess");
        db = event.target.result;
        addBookmark();
      };
  
      request.onupgradeneeded = function (event) {
        window.alert('add bookmark');
        var db = event.target.result;
        console.log("running onupgradeneeded");
        if (!db.objectStoreNames.contains("bookmark")) {
          var objectStore = db.createObjectStore("bookmark", { keyPath: "ppostid" });
          
        }
      };
      function addBookmark() {
        const data = {
          ppostid:postid,
          puserid:userid
        };
        //Get a transaction
        //default for OS list is all, default for type is read
        var transaction = db.transaction(["bookmark"], "readwrite");
        transaction.oncomplete = function (event) {
          console.log("All done!");
          navigator.serviceWorker.ready
          .then(registration => {
            registration.sync.register('bookmark').then(() => {
              console.log('sync registered')
            });
          });
        };
        transaction.onerror = function (event) {
          // Don't forget to handle errors
          console.log('erro');
        };
        //Ask for the objectStore
        var objectStore = transaction.objectStore('bookmark');
          var request = objectStore.add(data);
          request.onsuccess = function (event) {
            // event.target.result === customer.ssn;
          };
          request.onerror = function (event) {
            console.log("Error", event.target.error.name);
            //some type of error handler
          }
      }
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
        <div className="container">
          <h1 className="main-title font-weight-600" dangerouslySetInnerHTML={{ __html: title }}></h1>
          <div className="profile">
            <a>
              <img src={avartar} alt="avatar" />
            </a>
            <span>{name}</span>
            <a><i onClick={this.handleBookmark} className={`far fa-bookmark ${bookmark}`} data-toggle="tooltip" data-placement="bottom" title="Bookmark this story to read later"></i></a>
            <br /><span className="date">{time}</span>
          </div>
          <div className="content-post" dangerouslySetInnerHTML={{ __html: content }}>
          </div>
          <div className="profile">
            <a onClick={this.handleClap}>
              <img src="https://image.flaticon.com/icons/svg/511/511213.svg" alt="" />
            </a>
            <span>{clap} claps</span>
            <a><i onClick={this.handleBookmark} className={`far fa-bookmark ${bookmark}`} data-toggle="tooltip" data-placement="bottom" title="Bookmark this story to read later"></i></a>
          </div>
          <hr className="divider" />
          <div className="profile">
            <a>
              <img src={avartar} alt="avatar" />
            </a>
            <span>{name}</span>
            <a className="button">Follow</a>
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
