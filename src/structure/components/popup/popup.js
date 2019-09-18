'use strict'
import React from 'react';
import './popup.less';


class Popup extends React.Component {

  constructor(props) {

    super(props);
  }

  factory = () => {

    switch(this.props.styleCss) {

      case 'background-black': {

        // alert(this.props.styleCss);
        return (
          <PopupBackground styleCss="background-black">
            {this.props.children}
          </PopupBackground>
        );
      }
      case 'background-white': {

        return (
          <PopupBackground styleCss="background-white">
            {this.props.children}
          </PopupBackground>
        );
      }
      case 'box-shadow': {

        return (
          <PopupShadow>
            {this.props.children}
          </PopupShadow>
        );
      }
      default: {

        break;
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.factory()}
      </React.Fragment>
    );
  }
}

class PopupBackground extends Popup {

  render() {
    return(
      <div className={"popup popup-background " + this.props.styleCss}>
        <div className="popup-container">
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

class PopupShadow extends Popup {

  render() {
    return(
      <div className="popup popup-shadow">
        <div className="popup-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Popup;