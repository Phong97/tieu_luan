import React from 'react';
import './style.scss';
import MCard from '../../component/MCard';

class Item extends React.Component {
  render() {
    const { data } = this.props;
    let publish = true;
    let id = '';
    if (data) {
      publish = data.state;
      if (data.category === 1) {
        data.name = 'Information';
      } else if (data.category === 2) {
        data.name = 'Art';
      } if (data.category === 3) {
        data.name = 'Tech';
      }
      id = data.id;
    }
    return (
      <div>
        <MCard data={data} position="right" />
        <div className="command-button">
          {!publish && <button onClick={() => this.props.handlePublish(data.id)} type="button" className="btn-sm btn-outline-success">Publish</button>}
          <button type="button" className="btn-sm btn-outline-primary" ><a href={`/user/new/${id}`}>Edit</a></button>
          <button onClick={() => this.props.handleSelectedDelete(data.id)} type="button" className="btn-sm btn-outline-danger" data-toggle="modal" data-target="#confirmModal">Delete</button>
        </div>
      </div>
    );
  }
}

export default Item;
