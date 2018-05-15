import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import './js/videojs-resolution-switcher';
import 'video.js/dist/video-js.min.css';
import './css/playerComponent.css';
import { HlsSourceHandler } from 'videojs-contrib-hls';
// import Swf from 'videojs-swf/dist/video-js.swf';
// import 'videojs-flash';
// import 'videojs-resolution-switcher';

export default class VideoJsForReact extends Component {
  constructor(props) {
    super(props);
    this.options = {}
    this.sources = [];
    // 判断是否是多码流，来修改播放器的播放方式
    if (props.sources.length > 1) {
      // 若存在多个流地址，则开启videoJsResolutionSwitcher 
      this.sources = props.sources
    } else {
      this.options.source = props.sources
    }
  }

  componentDidMount() {
    videojs.getTech('html5').registerSourceHandler(HlsSourceHandler('html5'), 0);
    let _this = this
    this.player = videojs(this.videoContainer, {
      ...this.props,
      plugins: {
        videoJsResolutionSwitcher: {
          default: 'low', // Default resolution [{Number}, 'low', 'high'],
          dynamicLabel: true // Display dynamic labels or gear symbol
        }
      },
      // flash: {
      //   swf: Swf,
      // },
      ...this.options
    }, function () {
      let player = this
      let props = _this.props
      let sources = _this.sources

      // 播放器加载成功的回调
      if (!!props.onReady) {
        props.onReady(props)
      }

      // 修正使用多码流播放时自动播放失效的BUG
      // if (!!props.autoplay) {
      //   setInterval(() => {
      //     player.play();
      //   }, 100)
      // }
      // 判断是否是多码流，单码流调用video.js播放器原生播放，多码流使用插件播放
      if (sources.length > 1) {
        player.updateSrc([...sources])
        player.on('resolutionchange', function () {
          // 切换成功的回调
          if (!!props.sourceChanged) {
            props.sourceChanged(player)
          }
        })
      }
    })
  }

  componentWillUnmount() {
    // 销毁播放器
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div>
        <video
          ref={node => this.videoContainer = node}
          className="video-js"
        ></video>
      </div>
    )
  }
}

VideoJsForReact.propTypes = {
  sources: PropTypes.array.isRequired,  // 视频流地址列表 数组，必填
  sourceChanged: PropTypes.func,   // 多码流时，对码流切换的回调
  onReady: PropTypes.func   // 播放器加载成功时的回调
}

