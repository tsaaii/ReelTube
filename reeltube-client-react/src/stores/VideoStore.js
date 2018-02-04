import {observable, action, computed} from 'mobx';

class VideoStore {
  @observable video = 'https://www.youtube.com/watch?v=7vmufRwGh7k';
  @observable youtube = null;
  @observable snippets = [[10, 3],[30, 3], [50, 3], [0,0]];
  @observable mode = 'Preview Reel';

  @action setVideo = video => {
    this.video = video;
    console.log('worked')
  }
  @action setMode = mode => {
    this.mode = mode;
  }
  @action setSnips = snips => {
    this.snippets = snips;
    console.log(snips)
  }
  @action setYoutube = youtube => {
    this.youtube = youtube;
  }

  @computed get snipCount(){
    return this.snippets.length
  }

}

const store = new VideoStore();
export default store
