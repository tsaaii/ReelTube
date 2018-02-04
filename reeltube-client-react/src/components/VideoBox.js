import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import YouTube from 'react-youtube';
import YouTubePlayer from 'youtube-player';

@inject('VideoStore')
@observer

class VideoBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      vidURL: this.props.VideoStore.video,
      videoState: 'Preview...',
      start: 0
    }
  }
  componentDidMount(){
    const {VideoStore} = this.props
    VideoStore.setYoutube(YouTubePlayer(document.getElementById('video-player')))
    VideoStore.youtube.loadVideoById('EOT38vCv8YM')
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
      }, VideoStore.snippets[i][1]*1000);
    })(0);
  }

  handleSeek(e){
    const {VideoStore} = this.props;
    VideoStore.setMode('Highlight Reel')
    this.timedLoop(VideoStore.snipCount-1);
  }

  render() {
    const {VideoStore} = this.props
    return (
      <div className='VideoBox'>
      <h2>{VideoStore.mode}</h2>
        <div className='center'>
          <div id='cover'></div>
          <div id='video-player'>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoBox;
