import React from 'react';
import './style.scss';

class LRCard extends React.Component {
  render() {
    let position = "content-post";
    if (this.props.position === "left") {
      position += " post-left";
    } else {
      position += " post-right";
    }
    return (
      <div className="content-card" >
        <a><img src="http://placehold.it/300x150" alt="" /></a>
        <div className={position}>
          <div className="title-post">
            <a><h3 className="post post-name post-name-weight">Post Name</h3></a>
            <div className="post post-summary post-summary-weight">Post summary Post summary Post summary Post summary Post summary</div>
          </div>
          <div className="caption">
            <div className="post-name-weight">
              <a className="decoration">Author Name</a><span> in </span><a className="decoration">Category Name</a>
            </div>
            <div className="post-summary-weight">
              <span><time>Dec 12</time></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LRCard;
