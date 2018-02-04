
// dependencies
import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import './Assets/css/default.min.css';

// components
import VideoBox from './components/VideoBox';
import URLInput from './components/URLInput';

@inject('VideoStore')
@observer

class App extends Component {

  componentDidMount(){
    fetch('http://localhost:5000')
    .then(response => {console.log(response);});
  }


  render() {
    const {VideoStore} = this.props

    return (
      <div className="App">
        <div className="center">
          <h1>
            <span id='Reel'><u>Reel</u></span><span id='Tube'>Tube</span>
          </h1>
        </div>
        <div className="Main">
          <URLInput />
          <VideoBox />
        </div>
      </div>
    );
  }
}

export default App;
