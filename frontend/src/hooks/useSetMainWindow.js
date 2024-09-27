import React from "react";
import { useState } from React;

const useSetMainWindow = () => {
  const [currentComponent, setCurrentComponent] = useState('home');

  const setMainWindow = (component) => {
    setCurrentComponent(component);
  }
};

export default useSetMainWindow;