import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';

class EditProfile extends React.PureComponent {
  state = {
    name: "Evan Freitas",
    avatar: "http://placehold.it/80x80"
  }

  handleChangeName = (evt) => {
    this.setState({ name: evt.target.value });
  }
  handleChangeAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ avatar: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  render() {
    const { name, avatar } = this.state;
    return (
      <div className="EditProfile">
        <Helmet
          titleTemplate="Evan Freitas-Medium"
          defaultTitle="Evan Freitas-Medium"
        >
          <meta name="description" content="Medium" />
        </Helmet>
        <div class="profile">
          <a className="upload">
            <img src={avatar} alt="avatar" className="avatar" />
            <input onChange={this.handleChangeAvatar} type="file" id="image_uploads" name="image_uploads" id="image_uploads" accept=".jpg, .jpeg, .png" />
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
            <a href="/user"><button type="button" class="btn btn-outline-success">Save</button></a>
            <a href="/user"><button type="button" class="btn btn-outline-dark">Cancel</button></a>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;