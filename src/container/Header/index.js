import React from 'react';
import './style.scss';
import LoginForm from '../../component/LoginForm';
import SignupForm from '../../component/SignupForm';
var reg;
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
  handleSub=()=>{
    configurePushSub();
    function configurePushSub(){
      if(!('serviceWorker' in navigator)){
          return;
      }
      navigator.serviceWorker.ready
      .then(function(swreg){
          reg=swreg;
          return swreg.pushManager.getSubscription();
      })
      .then(function(sub){
          if(sub===null){
              //create a new subcription 
              var vapidpublickey='BNtWjGoBy3mQQg42-WIrcoBRcqLrwbyOTYWGSKKFYXTawq31EXFjZlBYDCqrapwmfLdJka3wNiXJKVhkx8A_zD0';
              var convertVapidkey=urlBase64ToUnit8Array(vapidpublickey);
              return reg.pushManager.subscribe({
                  userVisibleOnly:true,
                  applicationServerKey:convertVapidkey
              })
          }else{
              return sub;
          }
      })
      .then(function(newSub){
          console.log(JSON.stringify(newSub));
          fetch("http://localhost:3001/user/subcribe",{
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Accept':'application/json'
              },
              body:JSON.stringify(newSub)
          }).then(function(res){
              if(res){
                  var option={
                      body:'Now You subcribeed!',
                      icon:'/Rocket-icon-blue.png',
                      image:'/Rocket-icon-blue.png',
                      vibrate:[100,50,100],
                      badge:'/Rocket-icon-blue.png',
                      actions:[
                          {action:'confirm', title:'Ok', icon:'/Rocket-icon-blue.png'},
                          {action:'cancel', title:'cancel', icon:'/Rocket-icon-blue.png'}
                      ]
                  }
                  navigator.serviceWorker.ready
                  .then(noti=>{
                      noti.showNotification('subcribe successful',option);
                  })
              }
          })
      })
  }
  function urlBase64ToUnit8Array(base64String){
      var padding='='.repeat((4-base64String.length%4)%4); 
    var base64 = (base64String+padding)
      .replace(/\-/g,'+')
      .replace(/_/g,'/');
    var rawData = window.atob(base64);
    var outputArray= new Uint8Array(rawData.length);
  
    for(let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
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
              <button onClick={this.handleSub} className="btn btn-outline-success my-2 my-sm-0 login">Sub</button>
            </div>
          }
          {isLogin &&
            <div>
              <button className="btn btn-outline-success my-2 my-sm-0 login"><a href='/user'>User Page</a></button>
              <button onClick={this.handleLogout} className="btn btn-outline-success my-2 my-sm-0"><a href="/">LogOut</a></button>
              <button onClick={this.handleSub} className="btn btn-outline-success my-2 my-sm-0 login">Sub</button>
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
