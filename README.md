### VIDEOJS FRO REACT
该项目是一个react组件，组件封装了video.js。并集成了部分拓展功能，如：多码流切换，对HLS流的支持。

#### 使用方法
在项目中使用npm或者yarn安装依赖：  
 `npm install --save videojs-fro-react`  
`yarn add videojf-fro-react`  
该组件是针对video.js的封装，所以支持video.js的所有设置,具体设置请参考[ video.js文档](http://docs.videojs.com/)及[video.js github](https://github.com/videojs/video.js)。  
以下仅仅展现部分设置，以及该组件所添加的API。

示例代码：
```
import React, { Component } from 'react';
import VideoJsForReact from 'videojs-for-react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      videoJsOptions: {
        preload: 'auto',  // 预加载
        bigPlayButton: {},  // 大按钮
        autoplay: true,   // 自动播放
        controls: true,  // 是否开启控制栏
        width: 800,   // 播放器宽度
        height: 600,  // 播放器高度
        playbackRates: [1, 1.5, 2], // 播放倍速
        sources: [  // 视频源
          {
            src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/44_176_20170224113626af3a75cd-3508-4bc3-b51f-366fca3c7e39.m3u8',
            type: 'application/x-mpegURL',
            label: 'HLS1',
            withCredentials: false,
            res: 960
          }, {
            src: 'http://192.168.199.197:5000/nodeJS%E8%A7%86%E9%A2%914.mp4',
            type: 'video/mp4',
            label: 'MP4',
            res: 1080
          }
        ]
      }
    }
  }

  render() {
    return (
      <div className="player">
        <VideoJsForReact
          sourceChanged={(player) => console.log(player)}
          onReady={(player) => console.log('准备完毕', player)}
          {...this.state.videoJsOptions}
          >
        </VideoJsForReact>
      </div>
    )
  }
}

export default App;
```
与video.js不同的是，videojs-fro-react对接收的资源做了一些拓展：
```
  // 字段sources为array类型，当sources.length为1时，代表只播放一路码流，不开启视频源切换。
  // 当字段sources.length>1时，播放器将会开启多码流切换功能。 
  sources: [  
          {
            src: 'http://yunxianchang.live.ujne7.com/vod-system-bj/44_176_20170224113626af3a75cd-3508-4bc3-b51f-366fca3c7e39.m3u8',
            type: 'application/x-mpegURL', // MIME类型
            label: 'HLS1', // 代表该路码流名称
            res: 960  // 清晰度
          }, {
            src: 'http://192.168.199.197:5000/nodeJS%E8%A7%86%E9%A2%914.mp4',
            type: 'video/mp4',
            label: 'MP4',
            res: 1080
          }
        ]
```

##### API
| API | 用途| 
| - | -: | 
| sourceChanged| 码流切换成功的回调 | 
| onReady| 播放器准备就绪的回调 | 

现阶段该组件并没有实现更多功能的封装，接下来将会考虑支持rtmp、http-flv等。希望能够提出宝贵的建议，帮助我完善组件的功能。