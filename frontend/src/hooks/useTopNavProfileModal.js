import { useReducer, useEffect } from 'react';

const OPEN_PROFILE = 'OPEN_PROFILE';
const CLOSE_PROFILE = 'CLOSE_PROFILE';
const SET_PATIENT_DATA = 'SET_PATIENT_DATA';
const OPEN_SETTINGS = 'OPEN_SETTINGS';
const CLOSE_SETTINGS = 'CLOSE_SETTINGS';

const useTopNavProfileModal = () => {
  const initialState = {
    isProfileOpen: false,
    isSettingsOpen: false,
    patient: {}
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case OPEN_PROFILE:
        return {
          ...state,
          isProfileOpen: true,
        }
      case CLOSE_PROFILE:
        return {
          ...state,
          isProfileOpen: false,
        }
      case SET_PATIENT_DATA:
        return {
          ...state,
          patient: action.payload
        };
      case OPEN_SETTINGS:
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>Settings Opened");

        return {
          ...state,
          isSettingsOpen: true,
        }
      case CLOSE_SETTINGS:
        return {
          ...state,
          isSettingsOpen: false,
        }
      default:
        return state;
    }
  }

  const [topNavState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (topNavState.isProfileOpen) {
      fetch('/patient/4')
        .then(res => res.json())
        .then(data => {
          dispatch({ type: SET_PATIENT_DATA, payload: data })
        })
    }
  }, [topNavState.isProfileOpen]);

  const openProfile = () => {
    dispatch({ type: OPEN_PROFILE });
  };

  const closeProfile = () => {
    dispatch({ type: CLOSE_PROFILE });
  };

  const openSettings = () => {
    dispatch({ type: OPEN_SETTINGS });
  };

  const closeSettings = () => {
    dispatch({ type: CLOSE_SETTINGS });
  };


  return { topNavState, openProfile, closeProfile, openSettings, closeSettings };
};

export default useTopNavProfileModal;