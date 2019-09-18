'use strict'
import React from 'react';
import { Redirect } from 'react-router-dom'
import Superagent from 'superagent';
import LoginService from '../../services/login'
import URLs from '../../const/urls.js'
import Popup from '../../components/popup/popup';
import Logo from '../../assets/images/login/logo.jpg';

import './Login.less';


class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      url: URLs.server.login,
      windowsHeight: window.innerHeight,
      username: '',
      password: '',
      redirect: false,
    }
  }

  componentWillMount() {

    if(LoginService.isAuth())
      this.setState({redirect: true});
  }

  handleUsername = (e) => {
    this.setState({'username': e.target.value});
  }

  handlePassword = (e) => {
    this.setState({'password': e.target.value});
  }

  handleSubmit = (e) => {

    e.preventDefault();

    let data = {
      username: this.state.username,
      password: this.state.password,
    };

    Superagent
      .post(this.state.url)
      .set('Accept', 'application/json')
      .send(data)
      .then(res => {

        let result = res.body.response;
        console.log(res);
        if (result === "LOGIN_OK") {
          
          // SET LOGIN ON LOCALSTORAGE
          LoginService.login(this.state.username, this.state.password);
          this.setState({redirect: true});

        } else
          alert('username o password invalidi')

      }) .catch(err => {

        alert('Errore login');
      });
  }

  renderRedirect = () => {

    if (this.state.redirect)
      return <Redirect to={{pathname: "/"}} />;
  }

  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <div className="home-background" style={{height: this.state.windowsHeight}}>
          <Popup styleCss="background-black">
            <form onSubmit={this.handleSubmit}>
              <header>
                <img className="logo" src={Logo} alt="Soulseek logo" />
              </header>
              <section>
                <div className="input-text">
                  <input type="text" className="text-center" placeholder="USERNAME" onChange={this.handleUsername} />
                </div>            
                <div className="input-password">
                  <input type="password" className="text-center" placeholder="PASSWORD" onChange={this.handlePassword} />
                </div>              
              </section>
              <footer>
                <button type="submit" className="btn btn-primary">LOGIN</button>
              </footer>
            </form>
          </Popup>
        </div>
      </React.Fragment>
    );
  }
}

export default App;