import React from 'react';
import './style.scss';
import Menu from '../../component/Menu';
import LRCard from '../../component/LRCard';
import MCard from '../../component/MCard';
import Popular from '../../component/Popular';

class HomePage extends React.Component {
  state = {
    openLogin: false,
    openSignup: false
  }
  render() {
    return (
      <div className="HomePage container">
        <Menu />
        <div className="NewFeature container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 left">
              <LRCard position="left" />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 middle">
              <MCard position="left" />
              <MCard position="left" />
              <MCard position="left" />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 right">
              <LRCard position="right" />
            </div>
          </div>
          <div><a className="see-all font-weight-400">SEE ALL FEARURED ></a></div>
        </div>
        <hr className="divider" />
        <div className="SeveralFeature container">
          <div className="row">
            <div className="col-md-12 col-lg-8 first">
              <div>
                <div className="header-feature">
                  <a className="left-more"><h3 className="h3-feature font-weight-600 ellipsis">Featured for members</h3></a>
                  <a className="right-more font-weight-400">MORE ></a>
                </div>
                <hr className="divider" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
              </div>
              <div>
                <div className="header-feature">
                  <a className="left-more"><h3 className="h3-feature font-weight-600 ellipsis">Featured for members</h3></a>
                  <a className="right-more font-weight-400">MORE ></a>
                </div>
                <hr className="divider" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
              </div>
              <div>
                <div className="header-feature">
                  <a className="left-more"><h3 className="h3-feature font-weight-600 ellipsis">Featured for members</h3></a>
                  <a className="right-more font-weight-400">MORE ></a>
                </div>
                <hr className="divider" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
                <MCard position="right" />
              </div>
            </div>
            <div className="col-md-12 col-lg-4 second">
              <div><a><h3 className="font-weight-600 ellipsis">Popular on Medium</h3></a></div>
              <hr className="divider" />
              <div className="popular-list">
                <Popular number="01" />
                <Popular number="02" />
                <Popular number="03" />
                <Popular number="04" />
                <hr className="divider" />
                <div>Copy right 2018</div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default HomePage;
