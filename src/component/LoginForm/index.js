import React from 'react';
import './style.scss';

class LoginFrorm extends React.Component {
  state = {
    login: null
  }
  // componentDidMount () {
  //   const login = $("#login-form");
  //   this.setState({login : login})
  // }
  // handleLogin = () => {
  //   $("#login-form").modal("hide");
  // }
  render() {
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
                  <input type="text" placeholder="username" />
                </div>
              </div>
              <div className="row">
                <div class="col-3 font-weight-600">Password</div>
                <div class="col-9">
                  <input type="password" placeholder="password" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={() => this.handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginFrorm;
