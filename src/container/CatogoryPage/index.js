import React from 'react';
import './style.scss';
import MCard from '../../component/MCard';
import { Helmet } from 'react-helmet';
import Popular from '../../component/Popular';
import axios from 'axios';
import urlbackend from '../../evn.js';
var host=urlbackend();
class CatogoryPage extends React.Component {
  state = {
    post: '',
    top4: '',
    name: ''
  }
  componentDidMount() {
    const id = window.location.href.split('/')[4];
    if (id === '1') {
      this.setState({name: 'INFORMATON'});
    } else if (id === '2') {
      this.setState({name: 'ART'});
    } else if (id === '3') {
      this.setState({name: 'TECH'});
    } else this.setState({name: 'NOT FOUND'});
    axios.get(host+'post/viewest').then(res => this.setState({ top4: res.data[0] }));
    axios.post(host+'post/load_category', { id }).then(res => {
      const all = res.data[0];
      const post = all.map(post => {
        return <MCard data={post} position="right" />;
      });
      this.setState({post});
    });
  }
  render() {
    const { top4, post, name } = this.state;
    const popular1 = <Popular data={top4[0]} number="01" />
    const popular2 = <Popular data={top4[1]} number="02" />
    const popular3 = <Popular data={top4[2]} number="03" />
    const popular4 = <Popular data={top4[3]} number="04" />
    return (
      <div className="CatogoryPage">
        <Helmet
          titleTemplate={`Medium-${name}`}
          defaultTitle={name}
        >
          <meta name="description" content={name} />
        </Helmet>
        <div><h3 className="font-weight-600">{name}</h3></div>
        <div className="row">
          <div className="col-md-12 col-lg-8 first">
            <hr className="divider" />
            {post}
          </div>
          <div className="col-md-12 col-lg-4 second">
            <div><a><h3 className="font-weight-600 ellipsis">Popular in Medium</h3></a></div>
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
    );
  }
}

export default CatogoryPage;
