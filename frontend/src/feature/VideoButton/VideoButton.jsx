/* eslint-disable no-restricted-globals */
import React from 'react';
import { useContext } from 'react';
import { Card, Button } from 'antd';
import './VideoButton.scss';
import { useNavigate } from 'react-router-dom';
import ZoomContext from '../../context/zoom-context';

import videocallicon from '../../assets/videocallicon.png';

const { Meta } = Card;

const VideoButton = () => {

  //Use useContext hook to grab passed down value and create client variable
  const client = useContext(ZoomContext);

  const navigate = useNavigate();

  const beginSession = () => {
    client.init('US-EN', 'CDN')
      .then(() => {
        console.log('Session Initialized');
        navigate('/video');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="function-block">
      <div onClick={() => beginSession()}>
        <ZoomContext.Provider value={client}>
          <img src={videocallicon} className='function-block-icon' />
          {/* <h2 className='function-block-icon'>Zoom Video SDK feature</h2> */}
          <div className='label'>
            <Meta title={'Video Call and Share'} />
          </div>
        </ZoomContext.Provider>
      </div>
    </div>
  );
};

export default VideoButton;
