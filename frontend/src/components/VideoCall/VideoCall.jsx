//Zoom Setup
import ZoomContext from '../../context/zoom-context';
import {devConfig} from './devConfig';
import ZoomVideo from '@zoom/videosdk';
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { message } from 'antd';
import ZoomVideo from '@zoom/videosdk';
import MediaContext from './context/media-context';
import LoadingLayout from './components/LoadingLayout/LoadingLayout'
import VideoContainer from './feature/Video/Video';
import Home from './feature/Home/Home'

const VideoCall = (props) => {
  
  //Destructure props object
  const {
    meetingArgs: { sdkKey, topic, signature, name, passWord }
  } = props;

  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(' ');
  const [mediaStream, setMediaStream] = useState();
  const [status, setStatus] = useState(false);

  //Use useContext hook to grab passed down value and create client variable
  const client = useContext(ZoomContext);

  useEffect(() => {
    //Create init async function with try...catch block
    const init = async () => {
      console.log("CLIENT", client);

      client.init('US-EN', 'CDN')

      console.log("JOINING MEETING", props);
      
      // console.log("CLIENT JOIN", client.join(topic, signature, name, passWord));
    
      try {
        setLoadingText('Joining Session..')
        await client.join(topic, signature, name, passWord);
        console.log("MEDIA STREAM", client.getMediaStream());

        const stream = client.getMediaStream();
        
        setMediaStream(stream);
        setIsLoading(false);
      }
      catch(err) {
        console.log('Error Joining Meeting', err);
        setIsLoading(false);
        message.error(err.reason);
      }
    }

    //Call function and create clean up functionality
    init();
    return () => {
      ZoomVideo.destroyClient();
    }
  }, [sdkKey, signature, client, topic, name, passWord])

  return (
    <>
      {loading && <LoadingLayout content = {loadingText}/>}
        {!loading && (
          <MediaContext.Provider value = {mediaStream}>
            <Router>
              <Routes>
                <Route path = "/" element = {<Home props={props} status={status}/>}/>
                <Route path = "/video" element = {<VideoContainer />}/>
              </Routes>
            </Router>
          </MediaContext.Provider>
        )}
      
    </>
  )
}

export default VideoCall;

const client = ZoomVideo.createClient();

<ZoomContext.Provider value = {client}>
  <VideoCall />
</ZoomContext.Provider>