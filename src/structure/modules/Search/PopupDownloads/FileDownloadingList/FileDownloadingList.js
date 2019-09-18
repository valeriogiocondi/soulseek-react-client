import React from 'react';
import Superagent from 'superagent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { removeDownloadFileReducer } from '../../../../redux/actions/allActions'

import './FileDownloadingList.less';


class FileDownloadingList extends React.Component {
  
  removeFileDownload = (file) => {

    this.props.removeDownloadFileReducer(file);
  } 

  render() {

    let list = [];
    let removeFileDownloadReference = this.removeFileDownload;

    if (this.props.children.length > 0)
      this.props.children.map(function(val){

        list.push(<li onClick={() => removeFileDownloadReference(val)}>{val}</li>);
      }); 

    return(
      <ul>{list}</ul>
    );
  }
}


function mapStateToProps(state) {

  return { }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ 
  
    removeDownloadFileReducer: removeDownloadFileReducer

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileDownloadingList);