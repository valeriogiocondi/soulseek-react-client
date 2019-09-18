import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import LoginService from '../../services/login'
import './Logout.less';


class Logout extends Component {

	constructor(props) {

		super(props);

		this.state = {
			redirect: false
		}
	}

	componentWillMount() {
		
		LoginService.logout();
		this.setState({redirect: true});
	}

	renderRedirect = () => {

		if (this.state.redirect)
      return <Redirect to={{pathname: "/login"}} />;
	}

  render() {

    return (
    	<React.Fragment>
    		{this.renderRedirect()}
	      <div className="Logout">Logout</div>
    	</React.Fragment>
    );
  }
}

export default Logout;