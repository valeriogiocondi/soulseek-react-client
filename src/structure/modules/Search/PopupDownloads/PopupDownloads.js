import React from 'react';
import Superagent from 'superagent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Popup from '../../../components/popup/popup';
import FileDownloadingList from './FileDownloadingList/FileDownloadingList';

import './PopupDownloads.less';


class PopupDownloads extends React.Component {
  
  render() {

    return (
      <Popup styleCss={this.props.styleCss}>
        <FileDownloadingList>
          {this.props.downloadsList}
        </FileDownloadingList>
      </Popup>
    );
  }
}

function mapStateToProps(state) {

  return { 
    downloadsList: state.downloadFileReducer
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupDownloads);