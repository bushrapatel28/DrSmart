import logoutIcon from '../../assets/logout-icon-new.png';
import './Logout.scss';


const Logout = () => {
  return (
    <>
      <div className="menu-item ">
        <img src={logoutIcon} className="menu-item" />

      </div>
    </>
  )
}

export default Logout;