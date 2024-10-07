import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Zoom Setup
import ZoomContext from './context/zoom-context';
import {devConfig} from './devConfig';
import ZoomVideo from '@zoom/videosdk';


//devConfig obj contains meeting creds
let meetingArgs = {...devConfig};

const getToken = async(options) => {
  //Fetch call to Backend /generate end point and store response to variable
  //Parse body of respose variable as JSON
  //return variable
  let response = await fetch('/generate', options).then(response => response.json());
  return response;
}

//If No Signature but Topic exists
if(!meetingArgs.signature && meetingArgs.topic) {
  //Create requestOpt obj with method, header, and body
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(meetingArgs)
  }

  //Call getToken function with object as argument, set result of resolved promise to signature value in meetingArgs
  getToken(requestOptions).then(res => meetingArgs.signature = res)
}

const client = ZoomVideo.createClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZoomContext.Provider value = {client}>
      <App meetingArgs = {meetingArgs} />
    </ZoomContext.Provider>
  </StrictMode>,
)
