import React from 'react';
import './style.scss';
import LoginForm from '../../component/LoginForm';
import SignupForm from '../../component/SignupForm';
class Header extends React.Component {
  state = {
    isLogin: false
  }
  componentDidMount() {
    if (localStorage.getItem('userid')) {
      this.setState({ isLogin: true });
    }
  }
  handleLogout = () => {
    localStorage.removeItem('userid');
    this.setState({ isLogin: false });
  }
  handleLogin = () => {
    if (localStorage.getItem('userid')) {
      this.setState({ isLogin: true });
    }
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className="Header container">
        <nav className="navbar navbar-light justify-content-between ">
          <a href="/" className="navbar-brand"><h2>Medium</h2></a>
          {!isLogin &&
            <div>
              <button data-toggle="modal" data-target="#login-form" className="btn btn-outline-success my-2 my-sm-0 login">Sign in</button>
              <button data-toggle="modal" data-target="#signup-form" className="btn btn-outline-success my-2 my-sm-0">Get started</button>
            </div>
          }
          {isLogin &&
            <div>
              <button className="btn btn-outline-success my-2 my-sm-0 login"><a href='/user'>User Page</a></button>
              <button onClick={this.handleLogout} className="btn btn-outline-success my-2 my-sm-0"><a href="/">LogOut</a></button>
            </div>
          }
        </nav>
        <LoginForm handleLogin={this.handleLogin}/>
        <SignupForm />
      </div>
    );
  }
}

export default Header;
