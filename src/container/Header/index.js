import React from 'react';
import './style.scss';
import LoginForm from '../../component/LoginForm';
import SignupForm from '../../component/SignupForm';
class Header extends React.Component {
  // state = {
  //   openLogin: false,
  //   openSignup: false
  // }
  // handleOpenLogin() {
  //   this.setState({openLogin: true});
  // }
  // closeLogin() {
  //   this.setState({openLogin: false});
  // }
  // handleOpenSignup() {
  //   this.setState({openSignup: true});
  // }
  // closeSignup() {
  //   this.setState({openSignup: false});
  // }
  // state = {
  //   height: window.scrollY,
  //   class_name
  // }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScrollY.bind(this));
  // }

  // handleScrollY() {
  //   let currentScrollY = window.scrollY;
  //   this.setState({ height: currentScrollY });
  // }

  render() {
    // let class_name = "Header container";
    // if (this.state.height >= 50) {
    //   class_name += " height0";
    // }
    // const {openLogin, openSignup } = this.state;

    return (
      <div className="Header container">
        <nav className="navbar navbar-light justify-content-between ">
          <a href="/" className="navbar-brand"><h2>Medium</h2></a>
          <div>
            <button data-toggle="modal" data-target="#login-form" className="btn btn-outline-success my-2 my-sm-0 login">Sign in</button>
            <button data-toggle="modal" data-target="#signup-form" className="btn btn-outline-success my-2 my-sm-0">Get started</button>
          </div>
        </nav>
        <LoginForm />
        <SignupForm />
      </div>
    );
  }
}

export default Header;
