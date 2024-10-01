import './TopNavigationBar.scss'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import logo from '../../assets/drsmart-logo.png';

const TopNavigationBar = ({ role, username }) => {
  return (
    <div className="top-nav-bar">
      <img className="top-nav-bar__logo" src={logo} alt="DrSmart Logo" />
      <div className="welcome-section">
        {role === "patient" && <h1>Welcome, {username}</h1>}
        {role === "doctor" && <h1>Dr, {username}</h1>}
      </div>
      <div>
        <ProfileMenu />
      </div>
    </div>
  )
}

export default TopNavigationBar;