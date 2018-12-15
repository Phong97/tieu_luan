import React from 'react';
import './style.scss';

class LRCard extends React.Component {
  render() {
    let id = '';
    let title = '';
    let des = '';
    let img = '';
    let time = '';
    let username = '';
    let name = '';
    if (this.props.data) {
      const data = this.props.data;
      id = data.id;
      title = data.title.replace('<p>', '');
      title = title.replace('</p>', '');
      des = data.des.replace('<p>', '');
      des = des.replace('</p>', '');
      img = data.img;
      time = data.time;
      username = data.username;
      name = data.name;
    }
    let position = "content-post";
    if (this.props.position === "left") {
      position += " post-left";
    } else {
      position += " post-right";
    }
    return (
      <div className="content-card" >
        <a href={`/Post/${id}`}><img src={img} alt="" /></a>
        <div className={position}>
          <div className="title-post">
            <a href={`/Post/${id}`}><h3 className="post post-name post-name-weight ellipsis">{title}</h3></a>
            <div className="post post-summary post-summary-weight">{des}</div>
          </div>
          <div className="caption">
            <div className="post-name-weight">
              <a className="decoration">{username}</a><span> in </span><a className="decoration">{name}</a>
            </div>
            <div className="post-summary-weight">
              <span><time>{time}</time></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LRCard;
