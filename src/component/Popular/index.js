import React from 'react';
import './style.scss';

class Popular extends React.Component {
  render() {
    const number = this.props.number;
    return (
      <div className="Popular" >
        <div className="row">
          <div className="col-2 text-number">
            {number}
          </div>
          <div className="col-8">
            <div className="title-post">
              <a><h3 className="post post-name post-name-weight ellipsis">Nguyen thi thu truc tran thi thu</h3></a>
            </div>
            <div className="caption">
              <div className="post-name-weight">
                <a className="decoration">Name</a>
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

export default Popular;
