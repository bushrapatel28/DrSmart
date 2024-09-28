import './TopNavigationBar.scss'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import logo from '../../assets/drsmart-logo.png';

const TopNavigationBar = () => {
  const username = "Frank Navasky"

  return (
    <div className="top-nav-bar">
      <img className="top-nav-bar__logo" src={logo} alt="DrSmart Logo" />
      <div className="welcome-section">
        <h1>Welcome, {username}</h1>
      </div>
      <div>
        <ProfileMenu />
      </div>
    </div>
  )
}

export default TopNavigationBar;