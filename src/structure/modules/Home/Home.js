import React, { Component } from 'react';
import './Home.less';

class Home extends Component {

  render() {

    return (
      <div className="Home">
      	HOME {this.props.paramsURL}
      </div>
    );
  }
}

export default Home;