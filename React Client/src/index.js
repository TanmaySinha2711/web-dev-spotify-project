import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './containers/Homepage';
import PlaylistManager from './containers/PlaylistManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
<div>
  <PlaylistManager />
</div>,

document.getElementById('root')
);
