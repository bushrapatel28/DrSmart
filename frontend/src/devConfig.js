export const devConfig = [{
  topic: 'Appointment',
  name: 'Dr Joseph',
  passWord: 'medicine',
  userIdentity: 'doctor',
  sessionKey: '',
  // The user role. 1 to specify host or co-host. 0 to specify participant, Participants can join before the host. The session is started when the first user joins. Be sure to use a number type.
  roleType: 1
},
{
  topic: 'Appointment',
  name: 'Maria',
  passWord: 'medicine',
  userIdentity: 'patient1',
  sessionKey: '',
  roleType: 0  // Participant
}];