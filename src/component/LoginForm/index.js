import React from 'react';
import './style.scss';
import axios from 'axios';

class LoginFrorm extends React.Component {
  state = {
    username: '',
    password: ''
  }
  handleChangeUsername = (evt) => {
    this.setState({ username: evt.target.value });
  }
  handleChangePassword = (evt) => {
    this.setState({ password: evt.target.value });
  }
  handleLogin = () => {
    const { username, password } = this.state;
    axios.post('http://localhost:3001/user/check_login', {
      "username": username,
      "userpass" : password
    }).then(res=> {
      if (res.data[0]) {
        localStorage.setItem('userid', res.data[0].id);
        this.props.handleLogin();
      } else {
        alert('Username or Password is not correct!')
      }
    });
  }
  render() {
    const { username, password } = this.state;
    return (
      <div className="modal fade" id="login-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle font-weight-600">Login</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-3 font-weight-600">UserName</div>
                <div className="col-9">
                  <input onChange={this.handleChangeUsername} type="text" placeholder="username" value={username}/>
                </div>
              </div>
              <div className="row">
                <div className="col-3 font-weight-600">Password</div>
                <div className="col-9">
                  <input onChange={this.handleChangePassword} type="password" placeholder="password" value={password}/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginFrorm;
