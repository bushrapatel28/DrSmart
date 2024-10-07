import settingsIcon from '../../assets/settings-icon-new.png';
import './Settings.scss';


const Settings = () => {
  return (
    <>
      <div className="menu-item menu-item__settings">
        <img src={settingsIcon} className="menu-item" />

      </div>
    </>
  )
}

export default Settings;