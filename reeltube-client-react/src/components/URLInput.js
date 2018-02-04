import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('VideoStore')
@observer

class App extends Component {

  handleURLSearch(e){
    const {VideoStore} = this.props
    e.preventDefault()
    VideoStore.setVideo(this.search.value)
    VideoStore.youtube.loadVideoById(VideoStore.video.substring(VideoStore.video.indexOf('?')+3))
    VideoStore.setMode('Preview Reel');
    this.sendData()
  }

  sendData(){
    fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
        'mode': 'no-cors'
      },
      body: JSON.stringify({
        url: this.props.VideoStore.video
      })
    }).then(response => {return (response.json())})
    .then(responseJSON => {this.props.VideoStore.setSnips(responseJSON.times)});
  }

  handleSeek(e){
    const {VideoStore} = this.props;
    VideoStore.setMode('Highlight Reel')
    this.timedLoop(VideoStore.snipCount-1);
  }

    timedLoop(snips){
      const{VideoStore} = this.props
      VideoStore.youtube.playVideo();
      VideoStore.youtube.seekTo(VideoStore.snippets[0][0]);
      (function theLoop (i) {
        setTimeout(function () {
          i++;
          if (i <= snips) {          // If i > 0, keep going
            if (i == snips){
              VideoStore.youtube.pauseVideo();
            }else{
              VideoStore.youtube.seekTo(VideoStore.snippets[i][0])
            }
            console.log(i)
            theLoop(i);       // Call the loop again, and pass it the current value of i
          }
        }, VideoStore.snippets[i][1]*1000 + 200);
      })(0);
    }

  render() {
    const {VideoStore} = this.props


    var inputStyle = {width: '50%'}
    return (
      <div className="URLInput">
        <h2>Enter YouTube URL</h2>
        <form onSubmit={e => this.handleURLSearch(e)}>
          <div className="center">
            <input type="text" placeholder="https://www.youtube.com/..." style={{width:'75%'}} ref={input => this.search = input} />
          </div>
        </form>
        <div className="center">

          <form onSubmit={e => this.handleURLSearch(e)}><button type="submit">1. Load Video</button></form>
          <button onClick={() => this.handleSeek()}>2. Highlight Reel</button>
        </div>
      </div>
    );
  }
}

export default App;
