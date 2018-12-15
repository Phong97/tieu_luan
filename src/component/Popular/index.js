import React from 'react';
import './style.scss';

class Popular extends React.Component {
  render() {
    let id = '';
    let title = '';
    let time = '';
    let name = '';
    if (this.props.data) {
      const data = this.props.data;
      id = data.id;
      title = data.title.replace('<p>', '');
      title = title.replace('</p>', '');
      time = data.time;
      name = data.name;
    }
    const number = this.props.number;
    return (
      <div className="Popular" >
        <div className="row">
          <div className="col-2 text-number">
            {number}
          </div>
          <div className="col-8">
            <div className="title-post">
              <a href={`/Post/${id}`}><h3 className="post post-name post-name-weight ellipsis">{title}</h3></a>
            </div>
            <div className="caption">
              <div className="post-name-weight">
                <a className="decoration">{name}</a>
              </div>
              <div className="post-summary-weight">
                <span><time>{time}</time></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popular;
