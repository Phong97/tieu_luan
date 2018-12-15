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
      } else {
        alert('Username or Password is not correct!')
      }
    });
  }
  render() {
    const { username, password } = this.state;
    return (
      <div class="modal fade" id="login-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle font-weight-600">Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div class="col-3 font-weight-600">UserName</div>
                <div class="col-9">
                  <input onChange={this.handleChangeUsername} type="text" placeholder="username" value={username}/>
                </div>
              </div>
              <div className="row">
                <div class="col-3 font-weight-600">Password</div>
                <div class="col-9">
                  <input onChange={this.handleChangePassword} type="password" placeholder="password" value={password}/>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginFrorm;
