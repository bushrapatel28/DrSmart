import { devConfig } from "../devConfig";

const useZoomData = () => {
  //devConfig obj contains meeting creds
  const [meetingArgs, setMeetingArgs] = useState({...devConfig});

  const getToken = async(options) => {
    //Fetch call to Backend /generate end point and store response to variable
    //Parse body of respose variable as JSON
    //return variable
    const response = await fetch('/generate', options).then(response => response.json());
    console.log("RES", response.signature)
    return response.signature;
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
    getToken(requestOptions).then(res => setMeetingArgs({...meetingArgs, signature: res}))
  }

  return {meetingArgs};
}

export default useZoomData;