import React from 'react';
import Superagent from 'superagent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { addDownloadFileReducer, removeDownloadFileReducer } from '../../redux/actions/allActions'
import LoginService from '../../services/login'
import URLs from '../../const/urls.js'
import PopupDownloads from './PopupDownloads/PopupDownloads';

import './Search.less';


class Search extends React.Component {
  
	constructor(props) {

		super(props);

  	let loginData = LoginService.getLoginData();

		this.state = {
      urlSearch: URLs.server.search,
      urlDownload: URLs.server.download,
  		username: loginData['username'],
  		password: loginData['password'],
      searchKeyword: this.props.searchKeyword,
      result: {},
		}
	}

  componentWillMount() {

  	let data = {
  		username: this.state.username,
  		password: this.state.password,
  		searchKeyword: this.state.searchKeyword,
  	}

    Superagent
	    .post(this.state.urlSearch)
	    .set('Accept', 'application/json')
	    .send(data)
	    .then(res => {

	      this.setState({result: res.body.response});

	    }) .catch(err => {

	      // err.message, err.response
	    });
  }

  download = (fileName, fileToDownload) => {

  	let data = {
  		username: this.state.username,
  		password: this.state.password,
  		fileName: fileName,
  		file: fileToDownload,
  	}

	  // PUSH FILENAME INTO REDUX
	  this.props.addDownloadFileReducer(data.fileName);

    Superagent
	    .post(this.state.urlDownload)
	    .set('Accept', 'application/json')
	    .send(data)
	    .then(res => {

	    	// DELETE FILENAME FROM REDUX
	  		this.props.removeDownloadFileReducer(data.fileName);

	    	if (res.body.response === 'DOWNLOAD_OK')
	    		alert('File has been dowloaded!');
	    	else if (res.body.response === 'DOWNLOAD_ERROR')
	    		alert('Download error!');

	    }) .catch(err => {

	      // err.message, err.response
	    });
  }

  render() {

  	let tableContent = [];

  	if (this.state.result.length > 0) {

	  	this.state.result.map((val, index) => {

	  		let label = {};

	  		label.user = val.user.length >= 23 ? val.user.substr(0, 20) + '...' : val.user;

	  		label.name = val.file.split('\\');
	  		label.name = label.name[label.name.length-1];
	  		label.name = label.name.length >= 55 ? label.name.substr(0, 50) + '...' : label.name;

	  		label.slots = val.slots ? 'Y' : 'N';
	  		label.size = (val.size/(1024*1024)).toFixed(2) + ' MB';
	  		label.speed = val.speed;

				tableContent.push(
			    <tr>
			    	<td className="num"><div>{index+1}</div></td>
			    	<td className="user"><div>{label.user}</div></td>
			    	<td className="slots"><div>{label.slots}</div></td>
			    	<td className="name"><div>{label.name}</div></td>
			    	<td className="size"><div>{label.size}</div></td>
			    	<td className="speed"><div>{label.speed}</div></td>
			    	<td>
			    		<button class="btn btn-primary" onClick={() => this.download(label.name, val)}>DOWNLOAD</button>
			    	</td>
			    </tr>
				);
	  	});
  	}

    return (
      <div id="search">
        <PopupDownloads styleCss="box-shadow"/>
	      <table class="table">
				  <thead>
				    <tr>
				      <th>#</th>
				      <th>USER</th>
				      <th>FREE</th>
				      <th>NAME</th>
				      <th>SIZE</th>
				      <th>SPEED</th>
				      <th></th>
				    </tr>
				  </thead>
				  <tbody>
				  	{tableContent}
				  </tbody>
				</table>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {} 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

    addDownloadFileReducer: addDownloadFileReducer,
    removeDownloadFileReducer: removeDownloadFileReducer,

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);