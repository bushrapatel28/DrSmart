//Zoom Setup
import ZoomContext from '../../context/zoom-context';
import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import ZoomVideo from '@zoom/videosdk';
import MediaContext from '../../context/media-context';
import LoadingLayout from '../LoadingLayout/LoadingLayout';
import VideoContainer from '../../feature/VideoContainer/VideoContainer';

const VideoCall = (props) => {
  //Use useContext hook to grab passed down value and create client variable
  const client = useContext(ZoomContext);

  const navigate = useNavigate();
  
  //Destructure props object
  const {
    meetingArgs: { sdkKey, topic, signature, name, passWord }
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(' ');
  const [mediaStream, setMediaStream] = useState();

  //Create joinSession async function with try...catch block to get the Media Stream from Client
  const joinSession = async () => {
    console.log("CLIENT", client);

    console.log("JOINING MEETING", props.meetingArgs);
    
    setIsLoading('true');
    setLoadingText('Joining Session..')

    try {
      await client.join(topic, signature, name, passWord);
      console.log("MEDIA STREAM", client.getMediaStream());

      const stream = client.getMediaStream();
      
      setMediaStream(stream);
      setIsLoading(false);
      setLoadingText(' ')
    }
    catch(err) {
      console.log('Error Joining Meeting', err);
      setIsLoading(false);
      message.error(err.reason);
    }
  }

  const endSession = () => {
    client.leave();
    ZoomVideo.destroyClient();
    navigate('/');
  }

  return (
    <>
      {!mediaStream && 
        <div className='function-block'>
          <button onClick={() => joinSession()}>Join Session </button>
        </div>
      }
      {isLoading ? <LoadingLayout content = {loadingText}/> :
       mediaStream && 
        <MediaContext.Provider value = {mediaStream}>
          <VideoContainer props={mediaStream}/>
          <button onClick={() => endSession()}>End Session </button> 
        </MediaContext.Provider>
      }
    </>
  )
}

export default VideoCall;

