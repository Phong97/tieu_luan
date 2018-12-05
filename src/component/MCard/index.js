import React from 'react';
import './style.scss';

class MCard extends React.Component {
  render() {
    let position = "col-md-4";
    if (this.props.position === "right") {
      position += " flex-order-2";
    } 
    return (
      <div className="middle-card">
        <div className="row">
          <div className={position}>
            <a><img src="http://placehold.it/100x125" alt="" /></a>
          </div>
          <div className="col-md-8">
            <div className="title-post">
              <a><h3 className="post post-name post-name-weight">Post Name</h3></a>
              <div className="post post-summary post-summary-middle post-summary-weight">Post summary Post summary Post summary Post summary Post summary Post summary</div>
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
      </div>
    );
  }
}

export default MCard;
