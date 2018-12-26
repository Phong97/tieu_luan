import React from 'react';
import './style.scss';
import Menu from '../../component/Menu';
import LRCard from '../../component/LRCard';
import MCard from '../../component/MCard';
import Popular from '../../component/Popular';
import axios from 'axios';
import urlbackend from '../../evn.js';
var host=urlbackend();
class HomePage extends React.PureComponent {
  state = {
    openLogin: false,
    openSignup: false,
    top5: '',
    top4: '',
    all_post: ''
  }
  componentDidMount() {
    axios.get(host+'post/newest').then(res => this.setState({ top5: res.data[0] }));
    axios.get(host+'post/viewest').then(res => this.setState({ top4: res.data[0] }));
    axios.get(host+'post/load_all').then(res => {
      const all = res.data[0];
      const all_post = all.map(post => {
        return <MCard key={post.id} data={post} position="right" />;
      });
      this.setState({all_post});
    });
  }
  render() {
    const { top4, top5, all_post } = this.state;
    const new1 = <LRCard data={top5[0]} position="left" />;
    const new234 = (<React.Fragment>
      <MCard data={top5[1]} position="left" />
      <MCard data={top5[2]} position="left" />
      <MCard data={top5[3]} position="left" />
    </React.Fragment>
    );
    const new5 = <LRCard data={top5[4]} position="right" />;
    const popular1 = <Popular data={top4[0]} number="01" />
    const popular2 = <Popular data={top4[1]} number="02" />
    const popular3 = <Popular data={top4[2]} number="03" />
    const popular4 = <Popular data={top4[3]} number="04" />
    return (
      <div className="HomePage container">
        <Menu />
        <div className="NewFeature container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 left">
              {new1}
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 middle">
              {new234}
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 right">
              {new5}
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
                  <a className="left-more"><h3 className="h3-feature font-weight-600 ellipsis">Others</h3></a>
                  <a className="right-more font-weight-400">MORE ></a>
                </div>
                <hr className="divider" />
                {all_post}
              </div>
            </div>
            <div className="col-md-12 col-lg-4 second">
              <div><a><h3 className="font-weight-600 ellipsis">Popular on Medium</h3></a></div>
              <hr className="divider" />
              <div className="popular-list">
                {popular1}
                {popular2}
                {popular3}
                {popular4}
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
