import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Zoom Setup
import ZoomContext from './context/zoom-context.js'
import {devConfig} from './devConfig';
import ZoomVideo from '@zoom/videosdk';


//devConfig obj contains meeting creds
const meetingArgs = {...devConfig};

const getToken = async(options) => {
  //Fetch call to Backend /generate end point and store response to variable
  //Parse body of respose variable as JSON
  //return variable
  // const response = await fetch('/generate', options).then(response => response.json());
  // console.log("RES", response)
  // return response;

  console.log("OPTIONS", options);
  
  try {
    // Fetch call to Backend /generate endpoint
    const response = await fetch('/generate', options);

    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response body as JSON
    const data = await response.json();

    // Log the parsed JSON
    console.log("FETCHED DATA:", data);

    // Return the parsed data
    return data;
    
  } catch (error) {
    // Log and throw the error if the promise is rejected
    console.error("Fetch failed:", error);
    throw error; // Re-throwing the error to handle it outside the function
  }
}

//If No Signature but Topic exists
if(!meetingArgs.signature && meetingArgs.topic) {
  console.log("MEETING", meetingArgs);
  
  //Create requestOpt obj with method, header, and body
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(meetingArgs)
  }

  console.log("REQ OBJ", requestOptions);
  

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
