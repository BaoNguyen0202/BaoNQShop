import {createNavigationContainerRef} from '@react-navigation/native';
import React from 'react';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.navigate(name, params);
  }
}

export default {
  navigate,
};
