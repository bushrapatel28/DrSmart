import { useState, useContext, useCallback } from "react";
import { Button, Tooltip } from 'antd';
import { AudioOutlined, AudioMutedOutlined, VideoCameraAddOutlined, VideoCameraOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import IconHeadset from "../../assets/icon-headset.svg";
import ZoomContext from '../../context/zoom-context';
import MediaContext from '../../context/media-context';
import './VideoContainer.scss';

const VideoContainer = () => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShareScreen, setIsShareScreen] = useState(false);
  const [isSAB, setIsSAB] = useState(false);

  const client = useContext(ZoomContext);
  const mediaStream = useContext(MediaContext);

  //API gives access to raw video frames, chunks of audio data, image decoders, audio and video encoders and decoders
  const isSupportWebCodecs = () => {
    return typeof window.MediaStreamTrackProcessor === 'function';
  }

  const startVideoButton = useCallback(async () => {
    if (!videoStarted) {
      //Check Chrome Browser and SharedArrayBuffer enabled - API used by VideoSDK for more enhanced experience
      if (!!window.chrome && !(typeof SharedArrayBuffer === 'function')) {
        setIsSAB(false);
        await mediaStream.startVideo({videoElement: document.querySelector('#self-view-video'), fullHd: true })
      } else {
        setIsSAB(true);
        await mediaStream.startVideo({ fullHd: true });
        mediaStream.renderVideo(document.querySelector('#self-view-canvas'), client.getCurrentUserInfo().userId, 1920, 1080, 0, 0, 3)       //Dimensions, X/Y axes, Video Quality value 3 = 720p
      }
      setVideoStarted(true)
    } else {
      await mediaStream.stopVideo();
      if(isSAB) {
        mediaStream.stopRenderVideo(document.querySelector('#self-view-canvas'), client.getCurrentUserInfo().userId)
      }
      setVideoStarted(false);
    }

  }, [mediaStream, videoStarted, client, isSAB])


  const startAudioButton = useCallback(async () => {
    if (audioStarted) {
      if(isMuted) {
        await mediaStream.unmuteAudio();
        setIsMuted(false);
      } else {
        await mediaStream.muteAudio();
        setIsMuted(true);
      }
    } else {
      await mediaStream.startAudio();
      setAudioStarted(true);
    }
  }, [mediaStream, audioStarted, isMuted])


  const shareScreen = useCallback(async () => {
    if (isShareScreen) {
      await mediaStream.stopShareScreen();
      setIsShareScreen(false)
    } else {
      if (isSupportWebCodecs()) {                  //function at line 20
        await mediaStream.startShareScreen(document.querySelector('#share-video'))
      } else {
        await mediaStream.startShareScreen(document.querySelector('#share-canvas'))
      }
      setIsShareScreen(true)
    }
  }, [isShareScreen, mediaStream])


  return (
    <div className="zoom-video-screenshare-container">
      <div className="zoom-video-screenshare">
        { isSAB ? 
          <canvas id="self-view-canvas"></canvas>:
          <video id="self-view-video" ></video>
        }
        { !isSupportWebCodecs() ?
          <canvas id="share-canvas"></canvas>:
          <video id="share-video" ></video>
        }
      </div>

      <div className="video-footer">
        <Tooltip title={`${videoStarted ? 'Stop Camera' : 'Start Camera'}`}>
          <Button 
            className='camera-button'
            icon={videoStarted ? <VideoCameraOutlined /> : <VideoCameraAddOutlined />}
            shape='circle'
            size='large'
            onClick={startVideoButton}
          />
        </Tooltip>
        <Tooltip title={`${!isShareScreen ? 'Share Screen' : 'Stop Sharing Screen'}`}>
          <Button 
            className='camera-button'
            icon={isShareScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
            shape='circle'
            size='large'
            onClick={shareScreen}
          />
        </Tooltip>
        <Tooltip title={`${audioStarted ? isMuted ? 'unmute' : 'mute' : 'Start Audio'}`}>
          <Button 
            className='camera-button'
            icon={ audioStarted ? isMuted ? <AudioMutedOutlined /> : <AudioOutlined /> : <img src={IconHeadset}/>}
            shape='circle'
            size='large'
            onClick={startAudioButton}
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default VideoContainer;