import React from 'react';
import './style.scss';
import MCard from '../../component/MCard';
import { Helmet } from 'react-helmet';
import Popular from '../../component/Popular';

class CatogoryPage extends React.Component {
  render() {
    return (
      <div className="CatogoryPage">
        <Helmet
          titleTemplate="Medium-Catogory Name"
          defaultTitle="Catogory Name"
        >
          <meta name="description" content="Post Name" />
        </Helmet>
        <div><h3 className="font-weight-600">Catogory Name</h3></div>
        <div className="row">
          <div className="col-md-12 col-lg-8 first">
            <hr className="divider" />
            <MCard position="right" />
            <MCard position="right" />
            <MCard position="right" />
            <MCard position="right" />
            <MCard position="right" />
            <MCard position="right" />
          </div>
          <div className="col-md-12 col-lg-4 second">
            <div><a><h3 className="font-weight-600 ellipsis">Popular in Medium</h3></a></div>
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
    );
  }
}

export default CatogoryPage;
