/* eslint-disable no-restricted-globals */
import React from 'react';
import { useContext } from 'react';
import { Card, Button } from 'antd';
import './VideoButton.scss';
import { useNavigate } from 'react-router-dom';
import ZoomContext from '../../context/zoom-context';

const { Meta } = Card;

const VideoButton = (props) => {
  const { setSessionInit } = props;

  //Use useContext hook to grab passed down value and create client variable
  const client = useContext(ZoomContext);  

  const navigate = useNavigate();

  const beginSession = () => {
    client.init('US-EN', 'CDN')
    .then(() => {
      console.log('Session Initialized');
      setSessionInit(true);
      navigate('/video');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="function-block">
      <div onClick={() => beginSession()}>
        <ZoomContext.Provider value = {client}>
          <h2 className='function-block-icon'>Zoom Video SDK feature</h2>
            <div className='label'>
              <Meta title={'Audio, video and share'} />
            </div>
        </ZoomContext.Provider>
      </div>
    </div>
  );
};

export default VideoButton;
