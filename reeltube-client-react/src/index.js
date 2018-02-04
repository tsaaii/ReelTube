import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'mobx-react';

import VideoStore from './stores/VideoStore';


ReactDOM.render(
  <Provider
    VideoStore={VideoStore}
    >
    <App/>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
