import React from 'react';
import './style.scss';
import Menu from '../../component/Menu';
import LRCard from '../../component/LRCard';
import MCard from '../../component/MCard';

class HomePage extends React.Component {
  render() {
    return (
      <div className="HomePage container">
        <Menu />
        <div className="NewFeature container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 left">
              <LRCard position="left" />
            </div>
            <div className="col-12 col-sm-6 col-md-4 middle">
              <MCard position="left" />
            </div>
            <div className="col-12 col-sm-6 col-md-4 right">
              <LRCard position="right" />
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default HomePage;
