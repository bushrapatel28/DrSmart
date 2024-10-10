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
  
  console.log("INSIDE VIDEOCALL", props.meetingArgs[0])
  const navigate = useNavigate();

  //Destructure props object
  const {
    topic, signature, name, passWord
  } = props.meetingArgs[0];
  // const {
    //   topic1, signature1, name1, passWord1
    // } = props.meetingArgs[1];
    
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(' ');
  const [mediaStream, setMediaStream] = useState();
  
  
  
  // const beginSubsession = async () => {
    
    // }

    //Create joinSession async function with try...catch block to get the Media Stream from Client
    const joinSession = async () => {
    console.log("CLIENT", client);
    
    console.log("JOINING MEETING", props.meetingArgs);

    setIsLoading('true');
    setLoadingText('Joining Session..')
    
    const subsessionClient = client.getSubsessionClient();
    try {
      await client.join(topic, signature, name, passWord);

      console.log("MEDIA STREAM", client.getMediaStream());
      

      //////////////////////////////////////////////////////////////////////////
      //NEW CODE
      //////////////////////////////////////////////////////////////////////////
      //Create a subsession client (patient)

      console.log("SUBSESSION CLIENT", subsessionClient);
      
      //Create a subsession (patient room)
      //createSubsessions() returns a PromiseArray of Subsession OR Error
      const subsessionOrError = await subsessionClient.createSubsessions(1);
      
      console.log("CREATE SUBSESSION", subsessionOrError);
      
      // if(subsessionOrError instanceof Error) {
      //   throw subsessionOrError;
      // }
      
      //Extract the Subsession Obj of the first subsession in the array, since there is only 1 subsession created
      const subsession = subsessionOrError[0];
      
      console.log("SUBSESSION", subsession);
      
      
      const currentParticipant = client.getCurrentUserInfo();
      console.log("CURRENT PARTICIPANT", currentParticipant);
      
      const otherParticipant = client.getAllUser()
      // .find((participant) => participant.displayName === 'Maria');
      console.log("OTHER PARTICIPANT", otherParticipant);
      
      // if (otherParticipant) {
      //   subsession.userList.push(currentParticipant, otherParticipant);
      // }

      //////////////////////////////////////////////////////////////////////////
      const stream = client.getMediaStream();

      setMediaStream(stream);
      setIsLoading(false);
      setLoadingText(' ');
    }
    catch (err) {
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

  const joinMariaSession = async () => {
    const {
      topic, signature, name, passWord
    } = props.meetingArgs[1];

    console.log("Joining session as Maria...");
  
    try {
      setIsLoading(true);
      setLoadingText('Maria is joining the session...');
  
      // Maria joins the session
      await client.join(topic, signature, name, passWord);
  
      const stream = client.getMediaStream();
      setMediaStream(stream);
      setIsLoading(false);
    } catch (err) {
      console.log('Error Joining Meeting for Maria', err);
      setIsLoading(false);
      message.error(err.reason);
    }
  };

  return (
    <>
      {!mediaStream &&
        <div className='function-block'>
          <button onClick={() => joinSession()}>Join Session </button>
          <button onClick={() => joinMariaSession()}>Maria Joins Session</button>
          <button onClick={() => endSession()}>End Session </button> 
        </div>
      }
      {isLoading ? <LoadingLayout content = {loadingText}/> :
       mediaStream && 
       <MediaContext.Provider value = {mediaStream}>
          <VideoContainer props={mediaStream}/>
         <button onClick={() => joinSession()}>Join Session </button>
          <button onClick={() => joinMariaSession()}>Maria Joins Session</button>
          <button onClick={() => endSession()}>End Session </button> 
      {/* {isLoading ? <LoadingLayout content={loadingText} /> :
        mediaStream &&
        <MediaContext.Provider value={mediaStream}>
          <VideoContainer props={mediaStream} />
          <button onClick={() => endSession()}>End Session </button> */}
        </MediaContext.Provider>
      }
    </>
  )
}

export default VideoCall;

