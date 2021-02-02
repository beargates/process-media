import * as React from 'react';

require('./vendor/ffmpeg.min');

let player = null;
let downloader = null;
const showPlayer = (data) => {
  const src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  // player = document.createElement('video');
  // player.src = src;
  // player.controls = true;
  downloader = document.createElement('a');
  downloader.href = src;
  downloader.download = 'test';
  downloader.innerText = 'download';
  document.body.append(downloader);
}

class App extends React.PureComponent {
  async componentDidMount() {
    const {createFFmpeg, fetchFile} = window.FFmpeg;
    const ffmpeg = createFFmpeg({
      log: true,
      corePath: 'ffmpeg-core.js',
    });

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    ffmpeg.FS('writeFile', 'demo.flv', await fetchFile('video.flv'));
    await ffmpeg.run('-i', 'demo.flv', 'output.mp4');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    showPlayer(data);
  }

  render() {
    return (
      <div className="App"></div>
    );
  }
}

export default App;
