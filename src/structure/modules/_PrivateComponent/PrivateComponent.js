import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import LoginService from '../../services/login'

import './PrivateComponents.less';


class PrivateComponents extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			searchKeyword: this.props.computedMatch.params.keyword,
			redirectLogout: false,
			redirectSearch: false,
		}
	}

	logout = () => {
		
		this.setState({redirectLogout: true});
  }

	search = (keyword) => {
		
		this.setState({
			redirectSearch: true, 
			searchKeyword: keyword,
		});
  }

	renderRedirect = () => {

    if (this.state.redirectLogout)
      return <Redirect to={{pathname: "/logout"}} />;
    else if (this.state.redirectSearch)
      return <Redirect to={{pathname: "/search/" + this.state.searchKeyword}} />;
  }

  render() {
 	 return (
 	 		<React.Fragment>
				{this.renderRedirect()}
	      <Route 
	      	render = {
	      		props => (
	      			
							LoginService.isAuth() ? (
					  		<div className="container">
					  			<TopBar 
					  				searchKeyword={this.state.searchKeyword} 
					  				logoutCallBack={this.logout} 
					  				searchCallBack={this.search} 
					  			/>
						      <div className="module-container">
										<this.props.component searchKeyword={this.state.searchKeyword} />
						      </div>
					     	</div>
							
							) : (
							
								<Redirect to={{pathname: "/login"}} />
							)
	      		)
		    	} 
		    />	
 	 		</React.Fragment>
    );
  }
}


class TopBar extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			searchKeyword: this.props.searchKeyword,
		}
	}

	handleSearchChange = (e) => {

		this.setState({searchKeyword: e.target.value});
	}

	search = (e) => {

		e.preventDefault();
		this.props.searchCallBack(this.state.searchKeyword);
	}

	logout = () => {

		this.props.logoutCallBack();
	}

	render() {
		return (
      <div className="topBar center">
	      <form onSubmit={this.search}>
	      	<div className="input-text">
		      	<input type="text" placeholder="SEARCH" onChange={this.handleSearchChange} value={this.state.searchKeyword} />
		      </div>
	      </form>
    		<button className="float-right btn btn-link" onClick={this.logout}>LOGOUT</button>
      </div>
		);
	}
}

export default PrivateComponents;