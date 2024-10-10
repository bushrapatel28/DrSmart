import { devConfig } from "../devConfig";
import { useState, useEffect } from "react";

const useZoomData = () => {
  // Initialize state to hold meetingArgs for each participant
  const [meetingArgs, setMeetingArgs] = useState([...devConfig]);

  // Function to get the signature from the backend
  const getToken = async (options) => {
    const response = await fetch('/generate', options).then(response => response.json());
    console.log("RES", response.signature);
    return response.signature;
  };

  // Function to generate signatures for all participants
  const generateSignatures = async () => {
    // Map over the devConfig array to generate a signature for each participant
    const updatedMeetingArgs = await Promise.all(meetingArgs.map(async (participant) => {
      if (!participant.signature && participant.topic) {
        // Create requestOptions object for each participant
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(participant)
        };

        console.log("Request for", participant.name, requestOptions);
        
        // Generate signature for the participant
        const signature = await getToken(requestOptions);
        // Return the participant object with the new signature
        return { ...participant, signature };
      }
      return participant;  // Return participant as is if signature already exists
    }));

    // Update state with the updated meetingArgs array that includes signatures
    setMeetingArgs(updatedMeetingArgs);
  };

  // useEffect to trigger the signature generation once
  useEffect(() => {
    generateSignatures();
  }, []);

  return { meetingArgs };
};

export default useZoomData;



// import { devConfig } from "../devConfig";
// import { useState } from "react";

// const useZoomData = () => {
//   //devConfig obj contains meeting creds
//   const [meetingArgs, setMeetingArgs] = useState({...devConfig});

//   const getToken = async(options) => {
//     //Fetch call to Backend /generate end point and store response to variable
//     //Parse body of respose variable as JSON
//     //return variable
//     const response = await fetch('/generate', options).then(response => response.json());
//     console.log("RES", response.signature)
//     return response.signature;
//   }

//   //If No Signature but Topic exists
//   if(!meetingArgs.signature && meetingArgs.topic) {
//     console.log("MEETING", meetingArgs);
    
//     //Create requestOpt obj with method, header, and body
//     const requestOptions = {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(meetingArgs)
//     }

//     console.log("REQ OBJ", requestOptions);
    

//     //Call getToken function with object as argument, set result of resolved promise to signature value in meetingArgs
//     getToken(requestOptions).then(res => setMeetingArgs({...meetingArgs, signature: res}))
//   }

//   return {meetingArgs};
// }

// export default useZoomData;