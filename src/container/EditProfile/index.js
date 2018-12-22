import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class EditProfile extends React.PureComponent {
  state = {
    name: "",
    avatar: "http://placehold.it/80x80",
    image: ''
  }
  componentDidMount() {
    const userid = localStorage.getItem('userid');
    axios.post('http://localhost:3001/user/user_id', { userid }).then(res => {
      const profile = res.data[0][0];
      if (profile) {
        let avt = profile.avartar ? profile.avartar : "http://placehold.it/80x80";
        let n = profile.name;
        this.setState({ avatar: avt, name: n });
      }
    });
  }
  handleSave = () => {
    const userid = localStorage.getItem('userid');
    const { name, avatar } = this.state;
    axios.post('http://localhost:3001/user/update', { userid, name, avatar }).then(res => 
    window.location.assign('/user'));
  }
  handleModalAvatar = () => {
    this.setState({ image: this.state.avatar });
  }
  handleChangeImage = (evt) => {
    this.setState({ image: evt.target.value });
  }
  handleChangeName = (evt) => {
    this.setState({ name: evt.target.value });
  }
  handleChangeAvatar = () => {
    const { image } = this.state;
    this.setState({ avatar: image });
  }
  render() {
    const { name, avatar, image } = this.state;
    return (
      <div className="EditProfile">
        <Helmet
          titleTemplate="Evan Freitas-Medium"
          defaultTitle="Evan Freitas-Medium"
        >
          <meta name="description" content="Medium" />
        </Helmet>
        <div className="profile">
          <a className="upload">
            <img src={avatar} alt="avatar" className="avatar" />
            <button onClick={this.handleModalAvatar} data-toggle="modal" data-target="#avt-form" type="button" name="image_uploads" id="image_uploads" />
          </a>
          <div>
            <input type="text" value={name} onChange={this.handleChangeName} className="font-weight-600 username" />
          </div>
          <div className="follow font-weight-400">
            <a className="decoration"><span>15 Following</span></a>
            <a className="decoration"><span>15 Follower</span></a>
          </div>
          <br />
          <br />
          <hr className="divider" />
          <div>
            <a onClick={this.handleSave}><button type="button" className="btn btn-outline-success">Save</button></a>
            <a href="/user"><button type="button" className="btn btn-outline-dark">Cancel</button></a>
          </div>
        </div>
        <div className="modal fade" id="avt-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-weight-600" id="img-avt">Avartar</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-4 font-weight-600">Url Image</div>
                  <div className="col-8">
                    <input onChange={this.handleChangeImage} type="text" name="image" placeholder="Image" value={image} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick={this.handleChangeAvatar} type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
