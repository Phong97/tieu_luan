import React from 'react';
import './style.scss';
import MCard from '../../component/MCard';

class Item extends React.Component {
  render() {
    const { publish } = this.props;
    return (
      <div>
        <MCard position="right" />
        <div className="command-button">
          {!publish && <button type="button" class="btn-sm btn-outline-success">Publish</button>}
          <button type="button" class="btn-sm btn-outline-danger" data-toggle="modal" data-target="#confirmModal">Delete</button>
        </div>
      </div>
    );
  }
}

export default Item;
