import './TopNavigationBar.scss';
import UserProfile from '../UserProfile/UserProfile';
import logo from '../../assets/drsmart-logo.png';
import Settings from '../Settings/Settings';
import Logout from '../Logout/Logout';

const TopNavigationBar = ({ openProfile, openSettings, role, username }) => {
  return (
    <div className="top-nav-bar">
      <div>
        <img className="top-nav-bar__logo" src={logo} alt="DrSmart Logo" />
      </div>
      <div className="welcome-section">
        {role === "patient" && <h1>Welcome, {username}</h1>}
        {role === "doctor" && <h1>Dr, {username}</h1>}
      </div>
      <div className="nav-icons">
        <UserProfile openProfile={openProfile} />
        <Settings openSettings={openSettings} />
        <Logout />

      </div>
    </div>
  )
}

export default TopNavigationBar;