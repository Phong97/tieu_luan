import React from 'react';
import './style.scss';

const Header = () => (
  <div className="Header container">
    <nav className="navbar navbar-light justify-content-between ">
      <a className="navbar-brand"><h2>Medium</h2></a>
      <div>
        <button className="btn btn-outline-success my-2 my-sm-0 login">Sign in</button>
        <button className="btn btn-outline-success my-2 my-sm-0">Get started</button>
      </div>
    </nav>
  </div>
);

export default Header;
