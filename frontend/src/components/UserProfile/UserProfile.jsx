import { useState } from 'react';
import './UserProfile.scss';
import ProfileIcon from '../../assets/profile-icon-new.png'
const UserProfile = ({ openProfile }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="menu-items ">
      <img src={ProfileIcon} className="menu-item" onClick={openProfile} />
      {/* {isOpen && (
        <div className="menu-options">
          <p>Profile</p>
          <p>Settings</p>
          <p>Logout</p>
        </div>
      )} */}
    </div>
  );
};

export default UserProfile;
