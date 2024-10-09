/* eslint-disable no-restricted-globals */
import React from 'react';
import { useState } from 'react';
import { Card, Button } from 'antd';
import { IconFont } from '../../components/icon-font';
import './VideoButton.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MediaContext from '../../context/media-context';
import VideoContainer from '../Video/Video';

const { Meta } = Card;

const VideoButton = (props) => {
  // const { history, status, onLeaveOrJoinSession } = props;
  // const history = [];


  const [isClicked, setIsClicked] = useState(false);

  const onCardClick = () => {
    setIsClicked(true);
  };

  const featureList = [
    {
      key: 'video',
      icon: 'icon-meeting',
      title: 'Audio, video and share',
      description: 'Gallery Layout, Start/Stop Audio, Mute/Unmute, Start/Stop Video, Start/Stop Screen Share'
    },
    {
      key: 'chat',
      icon: 'icon-chat',
      title: 'Session chat',
      description: 'Session Chat, Chat Privilege'
    },
    {
      key: 'command',
      icon: 'icon-chat',
      title: 'Command Channel chat',
      description: 'Session Command Channel chat'
    },
    {
      key: 'subsession',
      icon: 'icon-group',
      title: 'Subsession',
      description: 'Open/Close Subsession, Assign/Move Participants into Subsession, Join/Leave Subsession'
    },
    {
      key: 'preview',
      icon: 'icon-meeting',
      title: 'Local Preview',
      description: 'Audio and Video preview'
    }
  ];

  // let actionText;
  // if (status === 'connected') {
  //   actionText = 'Leave';
  // } else if (status === 'closed') {
  //   actionText = 'Join';
  // }

  return (
    <div>
      {/* <div className="nav">
        <a href="/" className="navhome">
          <img src="./logo.svg" alt="Home" />
          <span>VideoSDK Demo</span>
        </a>
        <div className="navdoc">
          <a
            href="https://marketplace.zoom.us/docs/sdk/video/web/reference"
            target="_blank"
            rel="noreferrer"
          >
            <span>API Reference</span>
          </a>

          <a
            href="https://marketplace.zoom.us/docs/sdk/video/web/build/sample-app"
            target="_blank"
            rel="noreferrer"
          >
            <span>Doc</span>
          </a>
        </div>
        {actionText && (
          <Button type="link" className="navleave" onClick={onLeaveOrJoinSession}>
            {actionText}
          </Button>
        )}
      </div> */}

      <div className="home">
        <h1>Zoom Video SDK feature</h1>
        <div className="feature-entry">
          {/* {featureList.map((feature) => {
            const { key, icon, title, description } = feature; */}
          
            {/* {!isClicked &&  */}
              <Card
                // cover={<IconFont style={{ fontSize: '72px' }} type={icon} />}
                hoverable
                style={{ width: 320 }}
                className="entry-item"
                key={'video'}
                onClick={() => onCardClick()}
              >
                <Meta title={'Audio, video and share'} description={'Gallery Layout, Start/Stop Audio, Mute/Unmute, Start/Stop Video, Start/Stop Screen Share'} />
              </Card>
            {/* }

            {isClicked && 
              <MediaContext.Provider value = {props.mediaStream}>
                <VideoContainer />
                <Router>
                  <Routes>
                    <Route path = "/video" element = {<VideoContainer />}/>
                  </Routes>
                </Router>
              </MediaContext.Provider>
            } */}
  
          {/* })} */}
        </div>
      </div>
    </div>
  );
};

export default VideoButton;
