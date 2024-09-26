import { useState } from 'react';
import './ProfileMenu.scss';
import ProfileIcon from '../../assets/profile-icon.png'
const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-menu">
      <img src={ProfileIcon} className="hamburger" onClick={toggleMenu} />
      {isOpen && (
        <div className="menu-options">
          <p>Profile</p>
          <p>Settings</p>
          <p>Logout</p>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
